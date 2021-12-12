import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  category: string;
  recipes: Recipe[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    //Updating Category for new Route/Param
    this.route.params.subscribe(params => {
      this.category = params.category;
      this.getRecipes();
    });
  }

  getRecipes() {
    this.apiService.getRecipesByCategory(this.category).subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }, error => {
        this.router.navigate(['/404'], { skipLocationChange: true });
      });
  }
}
