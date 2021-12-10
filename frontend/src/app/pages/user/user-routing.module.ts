import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedIn } from 'src/app/core/services/authGuard';
import { UserLikedPageComponent } from './user-liked-page/user-liked-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';

const routes: Routes = [
  {
    path: 'liked',
    canActivate: [isLoggedIn],
    component: UserLikedPageComponent
  },
  {
    path: ':user',
    component: UserProfilePageComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
