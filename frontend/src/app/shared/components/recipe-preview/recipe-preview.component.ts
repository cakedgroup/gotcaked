import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.css']
})
export class RecipePreviewComponent{
  @Input() recipe : Recipe;
  public readonly baseUrl = environment.baseServer;

  constructor() {}
}
