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
  tags: Tag[];
  createdRecipe: Recipe;
  pictureFiles: File[] = [];

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

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {

  }

  //
  // Handler Stuff
  //
  createRecipeHandler() {
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
        console.log('Recipe created');
        this.createdRecipe = res.body;
        this.addPictureHandler();
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
  clearInput() {
    this.tempTag.name = '';
    this.tempTag.description = '';
  }
}
