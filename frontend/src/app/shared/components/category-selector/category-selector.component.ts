import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {
  @Input() category_id: string;
  @Output() category_idChange = new EventEmitter<string>();

  categories: Category[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.apiService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  changeCategory(){
    this.category_idChange.emit(this.category_id);
  }

}
