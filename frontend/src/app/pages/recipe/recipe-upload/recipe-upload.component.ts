import { Component } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { ApiService } from '../../../core/services/api.service';
import { errorHandler } from '../../../core/utils/errorHandler';
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
  recipeUploaded: boolean = false;

  //Temp Objects
  tempRecipe: RecipeCreate = {
    name: '',
    description: '',
    category_name: null,
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
    if (recipe.category_name) {
      this.apiService.createRecipe(recipe).subscribe(recipe => {
        this.createdRecipe = recipe;
        this.recipeUploaded = true;
        if (this.pictureFiles.length > 0) {
          this.addPictureHandler();
        } else {
          this.success = true;
        }
      }, error => {
        this.error = true;
        this.errorMessage = errorHandler(error);
      });
    } else {
      this.error = true;
      this.errorMessage = 'Category is required';
    }
  }

  addPicture(file: File) {
    this.apiService.uploadRecipePicture(this.createdRecipe.id, file).subscribe(recipe => {
      this.success = true;
    }, error => {
      this.error = true;
      this.errorMessage = error.error + "(Max. Size: 2MB)";
    });
  }

  //
  // Tag Stuff
  //
  deleteTag(tagName: string) {
    this.tempRecipe.tags = this.tempRecipe.tags.filter(tag => tag.name !== tagName);
  }

  addTag(tag: Tag) {
    if (!tag.name.includes(' ')) {
      //Cloning Object, to prevent using the
      let tagToStore = Object.assign({}, tag);
      this.clearInputTag();
      this.tempRecipe.tags.push(tagToStore);
      this.resetStatus();
    } else {
      this.error = true;
      this.errorMessage = 'Tag name cannot contain spaces';
    }
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
    this.tempRecipe.category_name = null;
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
