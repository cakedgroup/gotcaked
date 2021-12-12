import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Ingredients } from 'src/app/models/ingredients.model';

@Component({
  selector: 'app-ingredients-table-input',
  templateUrl: './ingredients-table-input.component.html',
  styleUrls: ['./ingredients-table-input.component.css']
})
export class IngredientsTableInputComponent {
  @Input() ingredients: Ingredients[];
  @Output() ingredientsChange = new EventEmitter<Ingredients[]>();

  tempIngredient: Ingredients = {
    id: null,
    name: '',
    amount: 0,
    unit: '',
  };

  //FA-Icons
  faTrash = faTrash;
  faPlus = faPlus;

  constructor() { }

  addIngredient() {
    //Cloning Object, to prevent using the reference
    let ingredientToStore = Object.assign({}, this.tempIngredient);
    this.clearInput();
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
