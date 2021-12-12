import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { errorHandler } from 'src/app/core/utils/errorHandler';
import { Recipe } from 'src/app/models/recipe.model';
import { Tag } from 'src/app/models/tag.model';
import { RecipeCreate } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  recipeSmall: RecipeCreate = {
    name: '',
    description: '',
    preparation: '',
    ingredients: [],
    time: 0,
    tags: [],
    category_name: '',
    picture_uri: [],
    difficulty: '',
  };

  tags: Tag[];
  pictureFiles: File[] = [];
  pictureToDelete: string[] = [];
  successMessage: string = 'Successfully updated recipe';
  errorMessage: string = '';
  success: boolean = false;
  error: boolean = false;

  tempTag: Tag = {
    name: '',
    description: '',
  };

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    //Updating Recipe for new Route/Param
    this.route.params.subscribe(params => {
      let recipeID = params.recipeID;
      this.getRecipe(recipeID);
      this.resetStatus();
    });
  }

  updateRecipeHandler() {
    this.resetStatus();
    this.updateRecipe();
  }

  updatePictureHandler() {
    this.pictureFiles.forEach(file => {
      this.addPicture(file);
    });
  }

  //
  // Recipe Stuff
  //
  getRecipe(recipeID: string) {
    this.apiService.getRecipe(recipeID).subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
        this.recipeToRecipeCreate(recipe);
      }, (error) => {
        this.router.navigate(['/404'], { skipLocationChange: true });
        this.errorMessage = 'Error getting recipe';
        this.error = true;
      }
    );
  }

  updateRecipe() {
    this.recipeCreateToRecipe(this.recipeSmall);
    this.apiService.updateRecipe(this.recipe).subscribe(recipe => {
      if (this.pictureFiles.length > 0 || this.pictureToDelete.length > 0) {
        this.deletePictures(this.pictureToDelete);
        this.updatePictureHandler();
      } else {
        this.success = true;
      }
    }, error => {
      this.error = true;
      this.errorMessage = errorHandler(error);
    });
  }

  //
  // Picture Stuff
  //
  addPicture(file: File) {
    this.apiService.uploadRecipePicture(this.recipe.id, file).subscribe(recipe => {
      this.success = true;
    }, error => {
      this.error = true;
      this.errorMessage = errorHandler(error);
    });
  }

  deletePictureQueue(pictureURI: string) {
    this.pictureToDelete.push(pictureURI);
  }

  deletePictures(pictureURIs: string[]) {
    pictureURIs.forEach(pictureURI => {
      this.apiService.deleteRecipePicture(this.recipe.id, pictureURI).subscribe(recipe => {
        this.success = true;
      }, error => {
        this.error = true;
        this.errorMessage = errorHandler(error);
      });
    });
  }

  //
  // Tag Stuff
  //
  addTag(tag: Tag) {
    //Cloning Object, to prevent using the reference
    let tagToStore = Object.assign({}, tag);
    this.clearInputTag();
    this.recipeSmall.tags.push(tagToStore);
  }

  deleteTag(tagName: string) {
    this.recipeSmall.tags = this.recipeSmall.tags.filter(tag => tag.name !== tagName);
  }

  //
  // Utils
  //
  recipeToRecipeCreate(recipe: Recipe) {
    this.recipeSmall.name = recipe.name;
    this.recipeSmall.description = recipe.description;
    this.recipeSmall.preparation = recipe.preparation;
    this.recipeSmall.ingredients = recipe.ingredients;
    this.recipeSmall.time = recipe.time;
    this.recipeSmall.tags = recipe.tags;
    this.recipeSmall.category_name = recipe.category_name;
    this.recipeSmall.picture_uri = recipe.picture_uri;
  }

  recipeCreateToRecipe(recipeSmall: RecipeCreate) {
    this.recipe.name = recipeSmall.name;
    this.recipe.description = recipeSmall.description;
    this.recipe.preparation = recipeSmall.preparation;
    this.recipe.ingredients = recipeSmall.ingredients;
    this.recipe.time = recipeSmall.time;
    this.recipe.tags = recipeSmall.tags;
    this.recipe.category_name = recipeSmall.category_name;
    this.recipe.picture_uri = recipeSmall.picture_uri;
  }

  clearInputTag() {
    this.tempTag.name = '';
    this.tempTag.description = '';
  }

  resetStatus() {
    this.success = false;
    this.error = false;
  }
}
