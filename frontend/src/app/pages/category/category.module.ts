import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryPageComponent } from './category-page/category-page.component';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    CategoryPageComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule
  ]
})
export class CategoryModule { }
