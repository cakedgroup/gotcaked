import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPlus, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-picture-uploader',
  templateUrl: './picture-uploader.component.html',
  styleUrls: ['./picture-uploader.component.css']
})
export class PictureUploaderComponent {
  @Input() pictures: File[] = [];
  @Output() picturesChange = new EventEmitter<File[]>();

  //Icons
  faUpload = faUpload;
  faPlus = faPlus;
  faTrash = faTrash;

  tempUploadedPictures: any[] = [];

  constructor() { }

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
    this.pictures.splice(index, 1);
    this.tempUploadedPictures.splice(index, 1);
    this.picturesChange.emit(this.pictures);
  }
}
