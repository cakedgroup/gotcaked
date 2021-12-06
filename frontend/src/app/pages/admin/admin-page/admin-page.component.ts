import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/models/category.model';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  //FA-Icons
  faTrash = faTrash;
  faCheckCircle = faCheckCircle;

  //Vars
  categories: Category[];
  tempCategory: Category = {
    name: '',
    description: '',
  };


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  addHandler() {
    this.addCategory(this.tempCategory);
  }

  deleteHandler(categoryName: string) {
    this.deleteCategory(categoryName);
  }

  updateHandler(category: Category) {
    this.updateCategory(category);
  }


  loadCategories() {
    this.apiService.getCategories().subscribe(
      (data: Category[]) => {
        console.log(data);
        this.categories = data;
      }
    );
  }

  addCategory(category: Category) {
    this.apiService.createCategory(category).subscribe(res => {
      if (res.status === 201) {
        this.loadCategories();
        this.tempCategory.name = '';
        this.tempCategory.description = '';
      } else {
        console.log('Error Creating Category');
      }
    });
  }

  updateCategory(category: Category) {
    this.apiService.updateCategory(category).subscribe(res => {
      if (res.status === 200) {
        this.loadCategories();
      } else {
        console.log('Error Updating Category');
      }
    });
  }

  deleteCategory(categoryName: string) {
    this.apiService.deleteCategory(categoryName).subscribe(res => {
      if (res.status === 204) {
        this.loadCategories();
      } else {
        console.log('Error Deleting Category');
      }
    });
  }
}
