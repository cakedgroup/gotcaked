import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RandomPageComponent } from './random-page/random-page.component';

const routes: Routes = [{ path: ':type/:name', component: RandomPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RandomRoutingModule { }
