import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeUploadComponent } from './recipe-upload.component';

const routes: Routes = [{ path: '', component: RecipeUploadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeUploadRoutingModule { }
