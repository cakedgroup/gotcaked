import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RecipePreviewComponent } from './components/recipe-preview/recipe-preview.component';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import { ContentHeaderComponent } from './components/content-header/content-header.component';
import { FormCreateFieldComponent } from './components/form-create-field/form-create-field.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormInputContainerComponent } from './components/form-input-container/form-input-container.component';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
import { IngredientsTableInputComponent } from './components/ingredients-table-input/ingredients-table-input.component';


@NgModule({
  declarations: [
    RecipePreviewComponent,
    UserPreviewComponent,
    ContentHeaderComponent,
    FormCreateFieldComponent,
    FormInputContainerComponent,
    CategorySelectorComponent,
    IngredientsTableInputComponent
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
    FormCreateFieldComponent,
    FormInputContainerComponent,
    CategorySelectorComponent,
    IngredientsTableInputComponent
  ]
})
export class SharedModule {
}
