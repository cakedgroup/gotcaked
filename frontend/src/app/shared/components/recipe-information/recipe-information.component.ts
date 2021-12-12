import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeCreate } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-information',
  templateUrl: './recipe-information.component.html',
  styleUrls: ['./recipe-information.component.css']
})
export class RecipeInformationComponent {
  @Input() recipe: RecipeCreate;
  @Output() recipeChange = new EventEmitter<RecipeCreate>();

  constructor() { }

}
