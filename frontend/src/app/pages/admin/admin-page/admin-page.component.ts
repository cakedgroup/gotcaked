import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/models/category.model';
import { Tag } from 'src/app/models/tag.model';
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
  tags: Tag[];
  failedCategoryRequest: boolean = false;
  failedTagRequest: boolean = false;
  failedErrorMessage: string = "";

  //Temp-Objects to Create A New Object
  tempCategory: Category = {
    name: '',
    description: '',
  };

  tempTag: Tag = {
    name: '',
    description: '',
  };


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadTags();
  }

  resetErrorMessages() {
    this.failedCategoryRequest = false;
    this.failedTagRequest = false;
    this.failedErrorMessage = "";
  }

  //
  //Form-Handler
  //

  //Add new Category Handler
  addCategoryHandler() {
    this.resetErrorMessages();
    this.addCategory(this.tempCategory);
  }

  //Add new Tag Handler
  addTagHandler() {
    this.resetErrorMessages();
    this.addTag(this.tempTag);
  }


  //
  // Category-API-Calls
  //
  //Fetch all Categories from API
  loadCategories() {
    this.apiService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      }
    );
  }

  //Add a new Category at the API
  addCategory(category: Category) {
    this.apiService.createCategory(category).subscribe(res => {
      if (res.status === 201) {
        this.loadCategories();
        this.resetErrorMessages();
        this.tempCategory.name = '';
        this.tempCategory.description = '';
      } else if (res.status === 409) {
        this.failedCategoryRequest = true;
        this.failedErrorMessage = "Category already exists!";
      }
    }, () => {
      this.failedCategoryRequest = true;
      this.failedErrorMessage = "Error Creating Category";
    });
  }

  //Update an existing Category at the API
  updateCategory(category: Category) {
    this.apiService.updateCategory(category).subscribe(res => {
      if (res.status === 200) {
        this.loadCategories();
        this.resetErrorMessages();
      } else {
        this.failedCategoryRequest = true;
        this.failedErrorMessage = "Error Updating Category";
      }
    }, () => {
      this.failedCategoryRequest = true;
      this.failedErrorMessage = "Error Updating Category";
    });
  }

  //Delete an existing Category at the API
  deleteCategory(categoryName: string) {
    this.apiService.deleteCategory(categoryName).subscribe(res => {
      if (res.status === 204) {
        this.loadCategories();
        this.resetErrorMessages();
      } else {
        this.failedCategoryRequest = true;
        this.failedErrorMessage = "Error Deleting Category";
      }
    },
      () => {
        this.failedCategoryRequest = true;
        this.failedErrorMessage = "Error Deleting Category";
      });
  }

  //
  // Category-API-Calls
  //
  //Fetch all Tags from API
  loadTags() {
    this.apiService.getTags().subscribe(
      (data: Tag[]) => {
        this.tags = data;
      }
    );
  }

  //Add a new Tag at the API
  addTag(tag: Tag) {
    this.apiService.createTag(tag).subscribe(res => {
      if (res.status === 201) {
        this.loadTags();
        this.resetErrorMessages();
        this.tempTag.name = '';
        this.tempTag.description = '';
      } else if (res.status === 409) {
        this.failedTagRequest = true;
        this.failedErrorMessage = "Category already exists!";
      }
    }, () => {
      this.failedTagRequest = true;
      this.failedErrorMessage = "Error Creating Tag";
    });
  }

  //Delete an existing Tag at the API
  deleteTag(tagName: string) {
    this.apiService.deleteTag(tagName).subscribe(res => {
      if (res.status === 204) {
        this.loadTags();
        this.resetErrorMessages();
      } else {
        this.failedTagRequest = true;
        this.failedErrorMessage = "Error Deleting Tag";
      }
    }, () => {
      this.failedTagRequest = true;
      this.failedErrorMessage = "Error Deleting Tag";
    });
  }
}
