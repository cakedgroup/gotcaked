import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { isLoggedIn } from '../../core/services/authGuard';

const routes: Routes = [
  {
    path: 'view/:recipeId',
    component: RecipePageComponent
  },
  {
    path: 'upload',
    canActivate: [isLoggedIn],
    loadChildren: () => import('./recipe-upload/recipe-upload.module').then(m => m.RecipeUploadModule)
  },
  {
    path: 'edit/:recipeID',
    canActivate: [isLoggedIn],
    loadChildren: () => import('./recipe-edit/recipe-edit.module').then(m => m.RecipeEditModule)
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
