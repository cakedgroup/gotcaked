import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { RecipeRoutingModule } from './recipe-routing.module';



@NgModule({
  declarations: [
      RecipePageComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule
  ]
})
export class RecipeModule { }
