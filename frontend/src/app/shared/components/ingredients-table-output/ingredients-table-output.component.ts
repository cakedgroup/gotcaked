import { Component, Input } from '@angular/core';
import { Ingredients } from 'src/app/models/ingredients.model';

@Component({
  selector: 'app-ingredients-table-output',
  templateUrl: './ingredients-table-output.component.html',
  styleUrls: ['./ingredients-table-output.component.css']
})
export class IngredientsTableOutputComponent {
  @Input() ingredients: Ingredients[];

  constructor() { }
}
