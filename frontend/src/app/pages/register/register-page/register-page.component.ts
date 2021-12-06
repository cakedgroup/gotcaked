import { Component, OnInit } from '@angular/core';
import { User, UserRegister } from 'src/app/models/user.model';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  userRegister: UserRegister = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    console.log('RegisterPageComponent');
  }

  registerHandler(): void {
    console.log(this.userRegister);
    //service
    if (this.userRegister.password === this.userRegister.passwordConfirmation) {
      this.apiService.createUser(this.userRegister).subscribe((res) => {
        if (res.status === 201) {
          console.log('User created');
          //Navigate to login page and sent credentials
          this.router.navigate(['/auth/login', { email: this.userRegister.email, password: this.userRegister.password }]);
        } else {
          //TODO Implement HTML Error Message
          console.log('User not created');
        }
      });
    } else {
      //TODO Implement HTML Password Error Message
    }
  }
}
