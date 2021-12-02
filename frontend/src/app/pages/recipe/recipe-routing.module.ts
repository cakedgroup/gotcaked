import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipePageComponent } from './recipe-page/recipe-page.component';

const routes: Routes = [
  {
    path: '',
    component: RecipePageComponent
  },
  {
    path: 'upload',
    loadChildren: () => import('./recipe-upload/recipe-upload.module').then(m => m.RecipeUploadModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./recipe-edit/recipe-edit.module').then(m => m.RecipeEditModule)
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
