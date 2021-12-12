import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TagOverviewComponent } from './tag-overview/tag-overview.component';
import { TagPageComponent } from './tag-page/tag-page.component';
import { TagRoutingModule } from './tag-routing.module';



@NgModule({
  declarations: [
    TagPageComponent,
    TagOverviewComponent
  ],
  imports: [
    CommonModule,
    TagRoutingModule,
    SharedModule
  ]
})
export class TagModule { }
