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
  errorMessage: string = '';
  error: boolean = false;

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
    this.authService.userLogin(this.userLogin).subscribe(jwt => {
      this.authService.setJWTToken(jwt.token);
      this.router.navigate(['/']);
      this.error = false;
    }, error => {
      this.error = true;
      this.errorMessage = error.error.message;
    });
  }
}
