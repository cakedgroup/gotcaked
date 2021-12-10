import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RegisterRoutingModule } from './register-routing.module';
import { SharedModule } from '../../shared/shared.module';



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
