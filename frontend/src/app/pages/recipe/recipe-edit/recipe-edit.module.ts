import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeEditRoutingModule } from './recipe-edit-routing.module';
import { RecipeEditComponent } from './recipe-edit.component';



@NgModule({
  declarations: [
    RecipeEditComponent
  ],
  imports: [
    CommonModule,
    RecipeEditRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class RecipeEditModule { }
