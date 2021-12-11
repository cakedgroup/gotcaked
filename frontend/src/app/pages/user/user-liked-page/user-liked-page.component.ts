import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-liked-page',
  templateUrl: './user-liked-page.component.html',
  styleUrls: ['./user-liked-page.component.css']
})
export class UserLikedPageComponent implements OnInit {
  recipes: Recipe[];
  userID: string;

  constructor(private authService: AuthService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getUserID();
    this.getLikedRecipes();
  }

  getUserID() {
    this.authService.getUser().subscribe(user => {
      this.userID = user.id;
    });
  }

  getLikedRecipes() {
    this.apiService.getLikedRecipesFromUser(this.userID).subscribe(recipes => {
      this.recipes = recipes;
    }, error => {
      this.router.navigate(['/404']);
    });
  }
}
