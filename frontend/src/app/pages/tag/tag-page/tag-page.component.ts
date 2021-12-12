import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.css']
})
export class TagPageComponent implements OnInit {
  tag: string;
  recipes: Recipe[] = [];

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    //Updating tag for new Route/Param
    this.route.params.subscribe(params => {
      this.tag = params.tag;
      this.getRecipes();
    });
  }

  getRecipes() {
    this.apiService.getRecipesByTag(this.tag).subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      },
      (error) => {
        this.router.navigate(['/404'], { skipLocationChange: true });
      }
    );
  }
}
