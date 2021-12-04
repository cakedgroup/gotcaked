import { Component, OnInit } from '@angular/core';
import { User, UserRegister } from 'src/app/models/user.model';

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

  constructor() { }

  ngOnInit(): void {
  }

  registerHandler(): void {
    console.log(this.userRegister);
    //service
    //redirect
  }

}
