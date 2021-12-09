import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ingredients } from 'src/app/models/ingredients.model';

@Component({
  selector: 'app-ingredients-table-input',
  templateUrl: './ingredients-table-input.component.html',
  styleUrls: ['./ingredients-table-input.component.css']
})
export class IngredientsTableInputComponent implements OnInit {
  @Input() ingredients: Ingredients[];
  @Output() ingredientsChange = new EventEmitter<Ingredients[]>();

  tempIngredient: Ingredients = {
    id: null,
    name: '',
    amount: 0,
    unit: '',
  };

  constructor() { }

  ngOnInit(): void {
    console.log('ingredients-table-input.component.ts');
  }

  addIngredient(index: number) {
    //Cloning Object, to prevent using the reference
    let ingredientToStore = Object.assign({}, this.tempIngredient);
    this.clearInput();
    //Store new ingredient
    this.ingredients.push(ingredientToStore);

  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

  clearInput() {
    this.tempIngredient = {
      id: null,
      name: '',
      amount: 0,
      unit: '',
    };
  }

}
