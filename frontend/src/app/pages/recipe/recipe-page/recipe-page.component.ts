import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Recipe } from 'src/app/models/recipe.model';
import { User } from 'src/app/models/user.model';
import { Comment } from 'src/app/models/comment.model';


@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {
  recipe: Recipe = {
    id: '',
    name: '',
    description: '',
    ingredients: [],
    tags: [],
    preparation: '',
    createdAt: undefined,
    time: undefined,
    difficulty: undefined,
    category_id: '',
    user_id: '',
    picture_uri: '',
    rating: undefined
  };
  user: User = {
    id: '',
    name: '',
    description: '',
    picture_uri: '',
    email: ''
  }

  recipeId: string;
  comments: Comment[];

  constructor(private apiService: ApiService, private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    //Updating tag for new Route/Param
    this.route.params.subscribe(params => {
      this.recipeId = params.recipeId;
      this.getRecipe();
    });
  }

  getRecipe() {
    this.apiService.getRecipe(this.recipeId).subscribe(
      data => {
        this.recipe = data;
      },
      error => {
        this.router.navigate(['/404'], { skipLocationChange: true });
      }
    );
  }

  getUser() {
    this.apiService.getUser(this.recipe.user_id).subscribe(
      data => {
        this.user= data;
      },
      error => {
        this.user.name= 'User not found';
      }
    );
  }

  getComments() {
    this.apiService.getCommentsByRecipe(this.recipeId).subscribe(
      data => {
        this.comments = data;
      },
      error => {
        this.comments = [];
      }
    );
  }



}
