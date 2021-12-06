import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  userName: String = 'TestUser';
  recipes: Recipe[] = [];

  constructor(private authService: AuthService, private apiService: ApiService) {

  }

  ngOnInit(): void {
    console.log("WelcomePage");
    this.authService.getUser().subscribe(user => {
      if (user !== null) {
        this.userName = user.name;
      }
    });

    this.apiService.getRecipes().subscribe((recipes) => {
      if (recipes !== null) {
        this.recipes = recipes;
      }
    }
    );

  }
}

