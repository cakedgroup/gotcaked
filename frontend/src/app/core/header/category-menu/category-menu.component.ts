import { Component, Input } from '@angular/core';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent {
  @Input() categories: Category[];

  constructor() { }
}
