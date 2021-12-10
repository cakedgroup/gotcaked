import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagPageComponent } from './tag-page/tag-page.component';

const routes: Routes = [{ path: ':tag', component:  TagPageComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }
