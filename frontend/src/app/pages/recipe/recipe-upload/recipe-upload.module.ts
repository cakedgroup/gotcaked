import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeUploadRoutingModule } from './recipe-upload-routing.module';
import { RecipeUploadComponent } from './recipe-upload.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RecipeUploadComponent
  ],
  imports: [
    CommonModule,
    RecipeUploadRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class RecipeUploadModule { }
