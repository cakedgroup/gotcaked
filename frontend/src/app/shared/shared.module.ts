import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
import { ContentHeaderComponent } from './components/content-header/content-header.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { FormCreateFieldComponent } from './components/form-create-field/form-create-field.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { IngredientsTableInputComponent } from './components/ingredients-table-input/ingredients-table-input.component';
import { IngredientsTableOutputComponent } from './components/ingredients-table-output/ingredients-table-output.component';
import { PictureUploaderComponent } from './components/picture-uploader/picture-uploader.component';
import { RecipeCommentInputComponent } from './components/recipe-comment-input/recipe-comment-input.component';
import { RecipeCommentsComponent } from './components/recipe-comments/recipe-comments.component';
import { RecipeInformationComponent } from './components/recipe-information/recipe-information.component';
import { RecipePreviewComponent } from './components/recipe-preview/recipe-preview.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TagSearchComponent } from './components/tag-search/tag-search.component';
import { UserPictureUploaderComponent } from './components/user-picture-uploader/user-picture-uploader.component';
import { FormInputTextareaComponent } from './components/form-input-textarea/form-input-textarea.component';
import { TagItemComponent } from './components/tag-item/tag-item.component';


@NgModule({
  declarations: [
    RecipePreviewComponent,
    ContentHeaderComponent,
    FormCreateFieldComponent,
    CategorySelectorComponent,
    IngredientsTableInputComponent,
    TagListComponent,
    TagSearchComponent,
    RecipeInformationComponent,
    PictureUploaderComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    FormInputComponent,
    UserPictureUploaderComponent,
    RecipeCommentsComponent,
    IngredientsTableOutputComponent,
    RecipeCommentInputComponent,
    FormInputTextareaComponent,
    TagItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RecipePreviewComponent,
    ContentHeaderComponent,
    FormCreateFieldComponent,
    CategorySelectorComponent,
    IngredientsTableInputComponent,
    TagListComponent,
    TagSearchComponent,
    RecipeInformationComponent,
    PictureUploaderComponent,
    SuccessMessageComponent,
    ErrorMessageComponent,
    FormInputComponent,
    UserPictureUploaderComponent,
    RecipeCommentsComponent,
    IngredientsTableOutputComponent,
    RecipeCommentInputComponent,
    FormInputTextareaComponent,
    TagItemComponent
  ]
})
export class SharedModule {
}
