import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserLikedPageComponent } from './user-liked-page/user-liked-page.component';
import { UserProfileHeaderComponent } from './user-profile-page/user-profile-header/user-profile-header.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    UserProfilePageComponent,
    UserLikedPageComponent,
    UserProfileHeaderComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
