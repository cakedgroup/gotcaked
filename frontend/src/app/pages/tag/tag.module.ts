import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TagPageComponent } from './tag-page/tag-page.component';
import { TagRoutingModule } from './tag-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    TagPageComponent
  ],
  imports: [
    CommonModule,
    TagRoutingModule,
    SharedModule
  ]
})
export class TagModule { }
