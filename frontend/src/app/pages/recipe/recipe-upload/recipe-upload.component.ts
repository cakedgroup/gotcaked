import { Component } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { ApiService } from '../../../core/services/api.service';
import { Recipe, RecipeCreate } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-upload',
  templateUrl: './recipe-upload.component.html',
  styleUrls: ['./recipe-upload.component.css']
})
export class RecipeUploadComponent {
  tags: Tag[];
  createdRecipe: Recipe;
  pictureFiles: File[] = [];
  successMessage: string = 'Successfully created recipe';
  errorMessage: string = '';
  success: boolean = false;
  error: boolean = false;

  //Temp Objects
  tempRecipe: RecipeCreate = {
    name: '',
    description: '',
    category_id: null,
    ingredients: [],
    preparation: "",
    picture_uri: null,
    tags: [],
    difficulty: null,
    time: null,
  };

  tempTag: Tag = {
    name: '',
    description: '',
  };

  constructor(private apiService: ApiService) { }

  //
  // Handler Stuff
  //
  createRecipeHandler() {
    this.resetStatus();
    this.createRecipe(this.tempRecipe);
  }

  addPictureHandler() {
    this.pictureFiles.forEach(file => {
      this.addPicture(file);
    });
  }

  //
  // Recipe Stuff
  //
  createRecipe(recipe: RecipeCreate) {
    this.apiService.createRecipe(recipe).subscribe(res => {
      if (res.status === 201) {
        this.createdRecipe = res.body;
        if (this.pictureFiles.length > 0) {
          this.addPictureHandler();
        } else {
          this.success = true;
        }
      } else {
        this.errorMessage = 'Failed to create recipe';
        this.error = true;
      }
    }, err => {
      this.errorMessage = 'Failed to create recipe: ' + err.error.message;
      this.error = true;
    });
  }

  addPicture(file: File) {
    this.apiService.uploadRecipePicture(this.createdRecipe.id, file).subscribe(res => {
      if (res.status === 200) {
        this.success = true;
      } else {
        this.errorMessage = 'Failed to upload picture';
        this.error = true;
      }
    });
  }

  //
  // Tag Stuff
  //
  deleteTag(tagName: string) {
    this.tempRecipe.tags = this.tempRecipe.tags.filter(tag => tag.name !== tagName);
  }

  addTag(tag: Tag) {
    //Cloning Object, to prevent using the reference
    let tagToStore = Object.assign({}, tag);
    this.clearInputTag();
    this.tempRecipe.tags.push(tagToStore);
  }

  //
  // Helper Functions
  //
  clearInputTag() {
    this.tempTag.name = '';
    this.tempTag.description = '';
  }
  clearInputRecipe() {
    this.tempRecipe.name = '';
    this.tempRecipe.description = '';
    this.tempRecipe.category_id = null;
    this.tempRecipe.ingredients = [];
    this.tempRecipe.preparation = '';
    this.tempRecipe.picture_uri = null;
    this.tempRecipe.tags = [];
    this.tempRecipe.difficulty = null;
    this.tempRecipe.time = null;
  }
  resetStatus() {
    this.success = false;
    this.error = false;
  }
}
