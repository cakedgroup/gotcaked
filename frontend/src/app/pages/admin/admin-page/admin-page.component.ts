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
  success: boolean = false;
  successMessage: string = 'Successfully updated Category';


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
      }, () => { },
      () => {
        this.apiService.updateCategories(this.categories);
      }
    );
  }

  //Add a new Category at the API
  addCategory(category: Category) {
    if (category.name.length > 0 && category.description.length > 0) {
      this.apiService.createCategory(category).subscribe(category => {
        this.loadCategories();
        this.resetErrorMessages();
        this.clearCategory();
        this.success = false;
      }, error => {
        this.failedCategoryRequest = true;
        this.success = false;
        if (error.error.errors) {
          this.failedErrorMessage = error.error.errors[0].msg;
        } else {
          this.failedErrorMessage = error.error.message;
        }
      });
    } else {
      this.failedCategoryRequest = true;
      this.success = false;
      this.failedErrorMessage = "Error Creating Category: Category-Name and Description must not be empty";
    }

  }

  //Update an existing Category at the API
  updateCategory(category: Category) {
    this.apiService.updateCategory(category).subscribe(category => {
      this.loadCategories();
      this.resetErrorMessages();
      this.success = true;
    }, error => {
      this.failedCategoryRequest = true;
      this.success = false;
      if (error.error.errors) {
        this.failedErrorMessage = error.error.errors[0].msg;
      } else {
        this.failedErrorMessage = error.error.message;
      }
    });
  }

  //Delete an existing Category at the API
  deleteCategory(categoryName: string) {
    this.apiService.deleteCategory(categoryName).subscribe(category => {
      this.loadCategories();
      this.resetErrorMessages();
    }, error => {
      this.failedCategoryRequest = true;
      this.success = false;
      if (error.error.errors) {
        this.failedErrorMessage = error.error.errors[0].msg;
      } else {
        this.failedErrorMessage = error.error.message;
      }
    });
  }

  //
  // Tag-API-Calls
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
    if (tag.name.length > 0 && tag.description.length > 0) {
      this.apiService.createTag(tag).subscribe(tag => {
        this.loadTags();
        this.resetErrorMessages();
        this.clearTag();
      }, error => {
        this.failedTagRequest = true;
        this.success = false;
        if (error.error.errors) {
          this.failedErrorMessage = error.error.errors[0].msg;
        } else {
          this.failedErrorMessage = error.error.message;
        }
      });
    } else {
      this.failedTagRequest = true;
      this.success = false;
      this.failedErrorMessage = "Error Creating Tag: Tag-Name and Description must not be empty";
    }
  }

  //Delete an existing Tag at the API
  deleteTag(tagName: string) {
    this.apiService.deleteTag(tagName).subscribe(tag => {
      this.loadTags();
      this.resetErrorMessages();
    }, error => {
      this.failedTagRequest = true;
      this.success = false;
      if (error.error.errors) {
        this.failedErrorMessage = error.error.errors[0].msg;
      } else {
        this.failedErrorMessage = error.error.message;
      }
    });
  }

  //
  // Utils
  //
  clearCategory() {
    this.tempCategory.name = '';
    this.tempCategory.description = '';
  }

  clearTag() {
    this.tempTag.name = '';
    this.tempTag.description = '';
  }

  resetErrorMessages() {
    this.failedCategoryRequest = false;
    this.failedTagRequest = false;
    this.failedErrorMessage = "";
  }
}
