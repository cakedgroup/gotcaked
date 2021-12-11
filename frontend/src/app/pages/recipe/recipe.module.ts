import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { RecipeRoutingModule } from './recipe-routing.module';



@NgModule({
  declarations: [
      RecipePageComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class RecipeModule { }
