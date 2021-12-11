import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, CanActivate } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Recipe, UserRating } from 'src/app/models/recipe.model';
import { User } from 'src/app/models/user.model';
import { RecipeComment } from 'src/app/models/comment.model';
import { environment } from 'src/environments/environment';
import { faEdit, faThumbsDown, faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { isAdmin } from '../../../core/services/authGuard';
import { AuthService } from '../../../core/services/auth.service';
import { isLoggedIn } from 'src/app/core/services/authGuard';


@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.css']
})
export class RecipePageComponent implements OnInit {
  recipe: Recipe | null;
  user: User | null;

  isAuthorized: boolean = false;
  isUser: boolean = false;

  recipeId: string;
  comments: RecipeComment[];
  userRating: UserRating = {
    recipe_id: null,
    user_id: null,
    vote: 0
  };

  faThumbsDown = faThumbsDown;
  faThumbsUp = faThumbsUp;
  faTrash = faTrash;
  faEdit = faEdit;

  public readonly baseUrl = environment.baseServer;

  constructor(private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private _isLoggedIn: isLoggedIn,
    private _isAdmin: isAdmin) { }

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

  getAuthorization() {
    if (this._isAdmin.canActivate()) {
      this.isAuthorized = true;
      this.isUser = true;
      this.getRatingStatus();
      return;
    } else if (this._isLoggedIn.canActivate()) {
      this.isUser = true;
      this.getRatingStatus();
    }
    this.authService.getUser().subscribe(user => {
      this.isAuthorized = user.id === this.recipe.user_id;
    });
  }


  getRecipe() {
    this.apiService.getRecipe(this.recipeId).subscribe(data => {
      this.recipe = data;
      this.getUser();
      this.getRating();
      this.getComments();
      this.getAuthorization();
    }, error => {
      this.router.navigate(['/404'], { skipLocationChange: true });
    }
    );
  }

  getRating() {
    this.apiService.getRecipeRating(this.recipeId).subscribe(data => {
      if (data.rating === null) {
        this.recipe.rating = 0;
      } else {
        this.recipe.rating = data.rating;
      }
    });
  }

  getUser() {
    this.apiService.getUser(this.recipe.user_id).subscribe(data => {
      this.user = data;
    }, error => {
      this.user.name = 'User not found';
    }
    );
  }

  getComments() {
    this.apiService.getCommentsByRecipe(this.recipeId).subscribe(data => {
      this.comments = data;
    }, error => {
      this.comments = [];
    }
    );
  }

  upVoteRecipe() {
    this.apiService.upVoteRecipe(this.recipeId).subscribe(() => {
      this.getRating();
      if (this.isUser) {
        this.getRatingStatus();
      }
    });
  }

  downVoteRecipe() {
    this.apiService.downVoteRecipe(this.recipeId).subscribe(() => {
      this.getRating();
      if (this.isUser) {
        this.getRatingStatus();
      }
    });
  }

  getRatingStatus() {
    this.apiService.getUserRatingStatus(this.recipeId).subscribe(data => {
      this.userRating = data;
    });
  }

  editRecipe() {
    this.router.navigate(['/recipe/edit/' + this.recipeId]);
  }

  deleteRecipe() {
    if (confirm("Do you want to delete the " + this.recipe.name + "Recipe ?")) {
      this.apiService.deleteRecipe(this.recipeId).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
