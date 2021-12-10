import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
import { ContentHeaderComponent } from './components/content-header/content-header.component';
import { FormCreateFieldComponent } from './components/form-create-field/form-create-field.component';
import { IngredientsTableInputComponent } from './components/ingredients-table-input/ingredients-table-input.component';
import { RecipeInformationComponent } from './components/recipe-information/recipe-information.component';
import { RecipePreviewComponent } from './components/recipe-preview/recipe-preview.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TagSearchComponent } from './components/tag-search/tag-search.component';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import { PictureUploaderComponent } from './components/picture-uploader/picture-uploader.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';


@NgModule({
  declarations: [
    RecipePreviewComponent,
    UserPreviewComponent,
    ContentHeaderComponent,
    FormCreateFieldComponent,
    CategorySelectorComponent,
    IngredientsTableInputComponent,
    TagListComponent,
    TagSearchComponent,
    RecipeInformationComponent,
    PictureUploaderComponent,
    SuccessMessageComponent,
    ErrorMessageComponent
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
    CategorySelectorComponent,
    IngredientsTableInputComponent,
    TagListComponent,
    TagSearchComponent,
    RecipeInformationComponent,
    PictureUploaderComponent,
    SuccessMessageComponent,
    ErrorMessageComponent
  ]
})
export class SharedModule {
}
