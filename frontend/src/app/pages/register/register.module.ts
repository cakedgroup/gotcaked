import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RegisterRoutingModule } from './register-routing.module';



@NgModule({
  declarations: [
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class RegisterModule { }
