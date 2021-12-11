import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router, Event as NavigationEvent, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories: Category[];
  currentRoute: string = null;
  routeType: string = null;
  routeName: string = null;
  showUserMenu: boolean = false;
  showCategoryMenu: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getCurrentRoute();
  }

  getCategories() {
    this.apiService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
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
        }

        console.log(this.routeType);
        console.log(this.routeName);
      }
    });
  }
}
