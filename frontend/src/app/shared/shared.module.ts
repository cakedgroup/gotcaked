import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RecipePreviewComponent } from './components/recipe-preview/recipe-preview.component';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import { ContentHeaderComponent } from './components/content-header/content-header.component';


@NgModule({
  declarations: [
    RecipePreviewComponent,
    UserPreviewComponent,
    ContentHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RecipePreviewComponent,
    UserPreviewComponent,
    ContentHeaderComponent
  ]
})
export class SharedModule {
}
