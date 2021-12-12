import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RandomPageComponent } from './random-page/random-page.component';
import { RandomRoutingModule } from './random-routing.module';



@NgModule({
  declarations: [
    RandomPageComponent
  ],
  imports: [
    RandomRoutingModule,
    SharedModule
  ]
})
export class RandomModule { }
