import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeUploadRoutingModule } from './recipe-upload-routing.module';
import { RecipeUploadComponent } from './recipe-upload.component';



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
