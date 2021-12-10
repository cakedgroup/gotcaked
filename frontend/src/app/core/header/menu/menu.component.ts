import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { isAdmin, isLoggedIn, isLoggedOut } from '../../services/authGuard';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userName: string;

  constructor(private authService: AuthService,
    private _isLoggedIn: isLoggedIn,
    private _isLoggedOut: isLoggedOut,
    private _isAdmin: isAdmin) {
  }

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName() {
    this.authService.getUser().subscribe(user => {
      if (user !== null) {
        this.userName = user.name;
      }
    });
  }

  isLoggedIn() {
    return this._isLoggedIn.canActivate() && !this._isAdmin.canActivate();
  }

  isLoggedOut() {
    return this._isLoggedOut.canActivate();
  }

  isAdmin() {
    return this._isAdmin.canActivate();
  }
}

