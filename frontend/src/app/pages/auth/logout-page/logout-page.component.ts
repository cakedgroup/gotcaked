import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.css']
})
export class LogoutPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    this.authService.userLogout().subscribe(response => {
      if (response.status === 200) {
        this.authService.setJWTToken(null);
        this.router.navigate(['/']);
      }
    });
  }
}
