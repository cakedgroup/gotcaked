import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import * as JWTUtils from '../utils/jwt-utils';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class isLoggedIn implements CanActivate {
  private isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.getAuthStatus();
  }


  canActivate(): boolean {
    return this.isLoggedIn;
  }

  getAuthStatus(): void {
    this.authService.getJWTToken().subscribe(token => {
      if (token !== null && token !== undefined && token !== "" && token !== "null") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class isLoggedInRedirect implements CanActivate {
  private isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.getAuthStatus();
  }


  canActivate(): boolean {
    return this.isLoggedIn;
  }

  getAuthStatus(): void {
    this.authService.getJWTToken().subscribe(token => {
      if (token !== null && token !== undefined && token !== "" && token !== "null") {
        this.isLoggedIn = true;
      } else {
        this.router.navigate(['auth/login']);
        this.isLoggedIn = false;
      }
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class isLoggedOut implements CanActivate {
  constructor(private guard: isLoggedIn) {
  }

  canActivate(): boolean {
    return !this.guard.canActivate();
  }
}

@Injectable({
  providedIn: 'root'
})
export class isLoggedOutRedirect implements CanActivate {
  constructor(private guard: isLoggedInRedirect) {
  }

  canActivate(): boolean {
    return !this.guard.canActivate();
  }
}

@Injectable({
  providedIn: 'root'
})
export class isAdmin implements CanActivate {
  private isAdmin: boolean = false;

  constructor(private authService: AuthService) {
    this.getAuthStatus();
  }

  canActivate(): boolean {
    return this.isAdmin;
  }

  getAuthStatus(): void {
    this.authService.getJWTToken().subscribe(token => {
      if (token !== null && token !== undefined && token !== "" && token !== "null") {
        if (JWTUtils.parseJWT(token as string).role === "admin") {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      } else {
        this.isAdmin = false;
      }
    });
  }
}

