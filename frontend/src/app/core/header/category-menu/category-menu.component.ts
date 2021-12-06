import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {
  @Input() categories: Category[];

  constructor() { }

  ngOnInit(): void {
  }

}
