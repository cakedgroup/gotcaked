import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    LogoutPageComponent,
    LoginPageComponent
  ],
  imports: [
    AuthRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class AuthModule { }
