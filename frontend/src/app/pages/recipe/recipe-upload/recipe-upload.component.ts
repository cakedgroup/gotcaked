import { Component, OnInit } from '@angular/core';
import { Recipe, RecipeCreate } from '../../../models/recipe.model';
import { ApiService } from '../../../core/services/api.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-recipe-upload',
  templateUrl: './recipe-upload.component.html',
  styleUrls: ['./recipe-upload.component.css']
})
export class RecipeUploadComponent implements OnInit {
  categories: Category[];
  createdRecipe: Recipe;
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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  createRecipeHandler() {
    this.createRecipe(this.tempRecipe);
  }

  getCategories() {
    this.apiService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
    });
  }


  createRecipe(recipe: RecipeCreate) {
    this.apiService.createRecipe(recipe).subscribe(res => {
      if (res.status === 201) {
        console.log('Recipe created');
      } else {
        console.log('Error');
      }
    }, err => {
    });
  }

  addPicture(file: File) {
    this.apiService.uploadRecipePicture(this.createdRecipe.id, file).subscribe(res => {
      if (res.status === 200) {
        console.log('Picture uploaded');
      } else {
        console.log('Error');
      }
    });
  }
}
