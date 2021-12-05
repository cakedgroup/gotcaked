import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories: Category[] = [{ name: "Cake", description: "Cake.." }, { name: "Muffin", description: "Muffin.." }, { name: "Cookies", description: "Cookies.." }];
  showUserMenu: boolean = false;
  showCategoryMenu: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.categories);
  }

  disableUserMenu(){
    this.showUserMenu = false;
  }

  enableUserMenu(){
    this.showUserMenu = true;
  }

  disableCategoryMenu(){
    this.showCategoryMenu = false;
  }

  enableCategoryMenu(){
    this.showCategoryMenu = true;
  }

}
