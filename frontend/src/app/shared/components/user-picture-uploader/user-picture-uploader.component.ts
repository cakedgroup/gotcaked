import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlus, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-picture-uploader',
  templateUrl: './user-picture-uploader.component.html',
  styleUrls: ['./user-picture-uploader.component.css']
})
export class UserPictureUploaderComponent implements OnInit {
  @Input() picture_uri: string;
  @Output() pictureChange = new EventEmitter<File>();

  tempUploadedPicture: string | ArrayBuffer = null;
  public readonly baseUrl = environment.baseServer;

  //Icons
  faUpload = faUpload;
  faPlus = faPlus;
  faTrash = faTrash;


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    if (this.picture_uri !== null || this.picture_uri !== undefined) {
      this.loadPicture(this.picture_uri);
    }
  }

  loadPicture(picture_uri: string) {
    this.tempUploadedPicture = this.baseUrl + picture_uri;
  }

  isPictureSet() {
    return !this.tempUploadedPicture.toString().includes(undefined || null);
  }

  setPicture(image: any) {
    const file = image.files[0];
    this.pictureChange.emit(file);

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.tempUploadedPicture = event.target.result;
    }
  }

}

