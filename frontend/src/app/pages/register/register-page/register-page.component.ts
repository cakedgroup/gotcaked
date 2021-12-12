import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/models/user.model';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  errorMessage: string = '';
  error: boolean = false;
  userRegister: UserRegister = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  constructor(private apiService: ApiService, private router: Router) { }

  registerHandler(): void {
    //Check if passwords match
    if (this.userRegister.name && this.userRegister.email && this.userRegister.password && this.userRegister.passwordConfirmation) {
      if (this.userRegister.password === this.userRegister.passwordConfirmation) {
        this.apiService.createUser(this.userRegister).subscribe(user => {
          this.router.navigate(['/auth/login', { email: user.email, password: this.userRegister.password }]);
        }, error => {
          this.error = true;
          if (error.error.errors) {
            this.errorMessage = error.error.errors[0].msg;
          } else {
            this.errorMessage = error.error.message;
          }
        });
      } else {
        this.errorMessage = 'Passwords do not match';
        this.error = true;
      }
    } else {
      this.errorMessage = 'Please fill out all fields';
      this.error = true;
    }
  }
}
