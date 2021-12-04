import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';

@NgModule({
  declarations: [
    LogoutPageComponent,
    LoginPageComponent
  ],
  imports: [
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
