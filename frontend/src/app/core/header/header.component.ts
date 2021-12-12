import { Component, OnInit } from '@angular/core';
import { Event as NavigationEvent, NavigationStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Category } from '../../models/category.model';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public readonly baseUrl = environment.baseServer;
  categories: Category[];
  userPicture: string = null;
  currentRoute: string = null;
  routeType: string = null;
  routeName: string = null;
  showUserMenu: boolean = false;
  showCategoryMenu: boolean = false;

  constructor(private authService: AuthService, private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getCurrentRoute();
    this.getUserPicture();
  }

  getCategories() {
    this.apiService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      });
  }

  getUserPicture() {
    this.authService.getUser().subscribe(user => {
      if (user) {
        this.apiService.getUser(user.id).subscribe(user => {
          this.userPicture = user.picture_uri;
        });
      } else {
        this.userPicture = null;
      }
    });
  }

  disableUserMenu() {
    this.showUserMenu = false;
  }

  enableUserMenu() {
    this.showUserMenu = true;
  }

  disableCategoryMenu() {
    this.showCategoryMenu = false;
  }

  enableCategoryMenu() {
    this.showCategoryMenu = true;
  }

  reloadRandomPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([`random/${this.routeType}/${this.routeName}`]);
  }

  getCurrentRoute() {
    this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationStart) {
        this.currentRoute = event.url;
        //Get type of route
        if (this.currentRoute.includes('/category/')) {
          this.routeType = 'category';
          this.routeName = this.currentRoute.split('/category/')[1];
        } else if (this.currentRoute.includes('/tag/')) {
          this.routeType = 'tag';
          this.routeName = this.currentRoute.split('/tag/')[1];
        } else {
          this.routeType = 'recipe';
          this.routeName = '';
        }
      }
    });
  }
}
