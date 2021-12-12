import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { errorHandler } from 'src/app/core/utils/errorHandler';
import { UserLogin } from 'src/app/models/user.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  successMessage: string = '';
  errorMessage: string = '';
  success_info: boolean = false;
  success_security: boolean = false;
  error_info: boolean = false;
  error_security: boolean = false;
  error_danger: boolean = false;

  user: User = {
    id: '',
    name: '',
    email: '',
    description: '',
    picture_uri: '',
  }
  pictureFile: File = null;

  currentPassword: string = '';
  newPassword: string = '';
  repeatNewPassword: string = '';

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  //
  // Handler
  //
  informationHandler() {
    this.updateUser();
  }

  pictureChangeHandler(file: File) {
    this.pictureFile = file;
  }

  passwordHandler() {
    this.updatePassword();

  }

  deleteUserHandler() {
    if (confirm("Do you want to delete this Account ?")) {
      this.deleteUser();
    }
  }

  //
  // API-Calls
  //
  updateUser() {
    this.apiService.updateUser(this.user).subscribe(user => {
      this.user = user;
      if (this.pictureFile){
        this.updateUserPicture();
      } else {
        this.successMessage = "Successfully updated User";
        this.setSuccessInfo();
      }
    },
      error => {
        this.setErrorInfo();
        this.errorMessage = errorHandler(error);
      }
    );
  }

  updateUserPicture() {
    if (this.pictureFile) {
      this.apiService.uploadUserPicture(this.user.id, this.pictureFile).subscribe(user => {
        this.successMessage = "Successfully updated Picture";
        this.setSuccessInfo();
      }, error => {
        this.setErrorInfo();
        this.errorMessage = error.error + "(Max. Size: 2MB)";
      });
    }
  }

  updatePassword() {
    //Check is password matches
    if (this.newPassword !== this.repeatNewPassword) {
      this.setErrorSecurity();
      this.errorMessage = "Passwords do not match";
      return;
    }

    let userLogin: UserLogin = {
      email: this.user.email,
      password: this.currentPassword
    };

    //Check if current password is correct
    this.authService.userLogin(userLogin).subscribe(() => {
      this.apiService.updateUserPassword(this.user.id, this.newPassword).subscribe(user => {
        this.successMessage = "Successfully updated Password";
        this.setSuccessSecurity();
      }, error => {
        this.setErrorSecurity();
        this.errorMessage = errorHandler(error);
      });
    }, error => {
      this.errorMessage = "Current password is incorrect";
      this.setErrorSecurity();
    });
  }

  deleteUser() {
    this.apiService.deleteUser(this.user.id).subscribe(() => {
      this.successMessage = "Successfully deleted User";
      this.authService.setJWTToken(null);
      this.router.navigate(['/']);
    }, error => {
      this.errorMessage = "Error deleting User " + error.error.message;
      this.error_danger = true;
    });
  }

  //
  // Helper
  //
  setSuccessInfo() {
    this.clearMessages();
    this.success_info = true;
  }
  setErrorInfo() {
    this.clearMessages();
    this.error_info = true;
  }

  setSuccessSecurity() {
    this.clearMessages();
    this.success_security = true;
  }
  setErrorSecurity() {
    this.clearMessages();
    this.error_security = true;
  }

  clearMessages() {
    this.success_security = false;
    this.error_security = false;
    this.success_info = false;
    this.error_info = false;
  }
}
