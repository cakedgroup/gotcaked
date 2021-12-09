import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
  @Input() categories: Category[];
  @Input() category_id: string;
  @Output() category_idChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.categories);
  }

}
