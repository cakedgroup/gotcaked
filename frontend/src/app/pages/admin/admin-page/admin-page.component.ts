import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  categories: Category[] = [{ name: "Cake", description: "Cake.." }, { name: "Muffin", description: "Muffin.." }, { name: "Cookies", description: "Cookies.." }];

  constructor() { }

  ngOnInit(): void {
  }

}
