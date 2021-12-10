import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { ApiService } from '../../../core/services/api.service';
import { Category } from '../../../models/category.model';
import { Recipe, RecipeCreate } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-upload',
  templateUrl: './recipe-upload.component.html',
  styleUrls: ['./recipe-upload.component.css']
})
export class RecipeUploadComponent implements OnInit {
  categories: Category[];
  tags: Tag[];
  createdRecipe: Recipe;

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

  ngOnInit(): void {
    this.getCategories();
  }

  //
  // Handler Stuff
  //
  createRecipeHandler() {
    this.createRecipe(this.tempRecipe);
    console.log(this.tempRecipe);
  }

  test(){
    console.log(this.tempRecipe);
  }
  getCategories() {
    this.apiService.getCategories().subscribe(categories => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  //
  // Recipe Stuff
  //
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

  //
  // Tag Stuff
  //
  deleteTag(tagName: string) {
    this.tempRecipe.tags = this.tempRecipe.tags.filter(tag => tag.name !== tagName);
  }

  addTag(tag: Tag) {
    //Cloning Object, to prevent using the reference
    let tagToStore = Object.assign({}, tag);
    this.clearInput();
    this.tempRecipe.tags.push(tagToStore);
  }

  getAllTags() {
    this.apiService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  //
  // Helper Functions
  //
  clearInput(){
    this.tempTag.name = '';
    this.tempTag.description = '';
  }
}
