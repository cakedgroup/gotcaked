import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { ApiService } from '../../../core/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-random-page',
  templateUrl: './random-page.component.html',
  styleUrls: ['./random-page.component.css']
})
export class RandomPageComponent implements OnInit {
  type: string = '';
  name: string = '';
  recipe: Recipe = undefined;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    //Updating Route-Stuff for new Route/Param
    this.route.params.subscribe(params => {
      this.type = params.type;
      this.name = params.name;
      if (this.type === "recipe") {
        this.type = "all Categories and Tags";
      }
      this.loadRandomRecipe();
    });
  }

  loadRandomRecipe() {
    if (this.type === 'category') {
      this.getRandomRecipeByCategory(this.name);
    }
    else if (this.type === 'tag') {
      this.getRandomRecipeByTag(this.name);
    }
    else {
      this.getRandomRecipe();
    }
  }

  getRandomRecipeByCategory(category: string) {
    this.apiService.getRandomRecipeByCategory(category).subscribe(recipe => {
      this.recipe = recipe;
    }, error => {
      this.recipe = undefined;
    });
  }

  getRandomRecipeByTag(tag: string) {
    this.apiService.getRandomRecipeByTag(tag).subscribe(recipe => {
      this.recipe = recipe;
    }, error => {
      this.recipe = undefined;
    });
  }

  getRandomRecipe() {
    this.apiService.getRandomRecipe().subscribe(recipe => {
      this.recipe = recipe;
    }, error => {
      this.recipe = undefined;
     });
  }
}
