import { Component, Input, OnInit } from '@angular/core';
import { Ingredients } from 'src/app/models/ingredients.model';

@Component({
  selector: 'app-ingredients-table-output',
  templateUrl: './ingredients-table-output.component.html',
  styleUrls: ['./ingredients-table-output.component.css']
})
export class IngredientsTableOutputComponent implements OnInit {
  @Input() ingredients: Ingredients[];

  constructor() { }

  ngOnInit(): void {
    console.log(this.ingredients);
  }

}
