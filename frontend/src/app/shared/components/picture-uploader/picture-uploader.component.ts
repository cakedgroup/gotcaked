import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlus, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-picture-uploader',
  templateUrl: './picture-uploader.component.html',
  styleUrls: ['./picture-uploader.component.css']
})
export class PictureUploaderComponent implements OnInit {
  @Input() recipeID: string;
  @Input() pictures: File[] = [];
  @Output() picturesChange = new EventEmitter<File[]>();
  @Output() pictureDeleted = new EventEmitter<string>();

  //Icons
  faUpload = faUpload;
  faPlus = faPlus;
  faTrash = faTrash;

  tempUploadedPictures: any[] = [];
  public readonly baseUrl = environment.baseServer;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    if (this.recipeID !== null || this.recipeID !== undefined) {
      this.getPicturesFromRecipe(this.recipeID);
    }
  }

  getPicturesFromRecipe(recipeID: string) {
    if (recipeID !== null && recipeID !== undefined && recipeID !== "undefined") {
      this.apiService.getRecipe(recipeID).subscribe(recipe => {
        recipe.picture_uri.forEach(picture => {
          this.tempUploadedPictures.push(this.baseUrl + picture);
        });
      });
    }
  }

  addPicture(image: any) {
    const file = image.files[0];
    this.pictures.push(file);
    this.picturesChange.emit(this.pictures);

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.tempUploadedPictures.push(event.target.result);
    }
  }

  removePicture(index: number) {
    if (this.tempUploadedPictures[index].includes(this.baseUrl)) {
      this.pictureDeleted.emit(this.tempUploadedPictures[index].substring(this.baseUrl.length));
    }
    this.pictures.splice(index, 1);
    this.tempUploadedPictures.splice(index, 1);
    this.picturesChange.emit(this.pictures);
  }
}
