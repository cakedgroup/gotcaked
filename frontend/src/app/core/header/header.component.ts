import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories: Category[];
  showUserMenu: boolean = false;
  showCategoryMenu: boolean = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getCategories();
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

}
