import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Recipe } from 'src/app/models/recipe.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {

  userID: string;
  user: User = {
    id: '',
    name: '',
    email: '',
    description: '',
    picture_uri: '',
  };

  recipes: Recipe[];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    //Updating User for new Route/Param
    this.route.params.subscribe(params => {
      this.userID = params.user;
      this.getUser();
    });
  }

  getUser() {
    this.apiService.getUser(this.userID).subscribe(
      (data: User) => {
        this.user = data;
        this.getRecipes();
      }, error => {
        this.router.navigate(['/404']);
      });
  }

  getRecipes() {
    this.apiService.getRecipesByUser(this.user.id).subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
      }
    );
  }

}
