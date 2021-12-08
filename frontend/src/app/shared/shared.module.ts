import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RecipePreviewComponent } from './components/recipe-preview/recipe-preview.component';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import { ContentHeaderComponent } from './components/content-header/content-header.component';
import { FormCreateFieldComponent } from './components/form-create-field/form-create-field.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    RecipePreviewComponent,
    UserPreviewComponent,
    ContentHeaderComponent,
    FormCreateFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RecipePreviewComponent,
    UserPreviewComponent,
    ContentHeaderComponent,
    FormCreateFieldComponent
  ]
})
export class SharedModule {
}
