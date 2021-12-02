import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeUploadRoutingModule } from './recipe-upload-routing.module';
import { RecipeUploadComponent } from './recipe-upload.component';


@NgModule({
  declarations: [
    RecipeUploadComponent
  ],
  imports: [
    CommonModule,
    RecipeUploadRoutingModule
  ]
})
export class RecipeUploadModule { }
