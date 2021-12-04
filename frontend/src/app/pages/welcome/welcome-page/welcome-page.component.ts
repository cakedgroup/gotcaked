import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  userName: String = 'TestUser';

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    console.log("WelcomePage");
    this.authService.getJWTToken().subscribe(token => {
      this.userName = token as String;
    });
  }
}
