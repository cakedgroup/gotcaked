import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Recipe } from 'src/app/models/recipe.model';
import { User } from 'src/app/models/user.model';
import { Comment } from 'src/app/models/comment.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {
  recipe: Recipe | null;
  user: User | null;

  recipeId: string;
  comments: Comment[];

  public readonly baseUrl = environment.baseServer;
  
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
        this.getUser();
        this.getComments();
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
