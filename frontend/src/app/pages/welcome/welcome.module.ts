import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { WelcomeRoutingModule } from './welcome-routing.module';



@NgModule({
  declarations: [
    WelcomePageComponent
  ],
  imports: [
    SharedModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule {
}
