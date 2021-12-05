import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeEditRoutingModule } from './recipe-edit-routing.module';
import { RecipeEditComponent } from './recipe-edit.component';


@NgModule({
  declarations: [
    RecipeEditComponent
  ],
  imports: [
    CommonModule,
    RecipeEditRoutingModule
  ]
})
export class RecipeEditModule { }
