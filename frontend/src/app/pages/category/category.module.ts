import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryPageComponent } from './category-page/category-page.component';
import { CategoryRoutingModule } from './category-routing.module';



@NgModule({
  declarations: [
    CategoryPageComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
