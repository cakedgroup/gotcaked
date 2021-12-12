import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedInRedirect, isLoggedOut } from '../../core/services/authGuard';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [isLoggedOut],
    component: LoginPageComponent
  },
  {
    path: 'logout',
    canActivate: [isLoggedInRedirect],
    component: LogoutPageComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
