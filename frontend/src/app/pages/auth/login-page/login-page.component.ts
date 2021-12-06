import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  userLogin: UserLogin = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCredentials();
  }

  //Getting Email and Password from Registration Page
  getCredentials(): void {
    this.userLogin.email = this.route.snapshot.paramMap.get('email');
    this.userLogin.password = this.route.snapshot.paramMap.get('password');
  }

  loginHandler(): void {
    console.log(this.userLogin);
    this.authService.userLogin(this.userLogin).subscribe(res => {
      if (res.status === 200) {
        this.authService.setJWTToken(res.body.token);
        this.router.navigate(['/']);
      } else {
        console.log(res.status);
        //TODO Implement Error Message in HTML
      }
    });
  }
}
