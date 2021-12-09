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
import { FormTextareaContainerComponent } from './components/form-textarea-container/form-textarea-container.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TagSearchComponent } from './components/tag-search/tag-search.component';


@NgModule({
  declarations: [
    RecipePreviewComponent,
    UserPreviewComponent,
    ContentHeaderComponent,
    FormCreateFieldComponent,
    FormInputContainerComponent,
    CategorySelectorComponent,
    IngredientsTableInputComponent,
    FormTextareaContainerComponent,
    TagListComponent,
    TagSearchComponent
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
    FormTextareaContainerComponent,
    CategorySelectorComponent,
    IngredientsTableInputComponent,
    TagListComponent,
    TagSearchComponent
  ]
})
export class SharedModule {
}
