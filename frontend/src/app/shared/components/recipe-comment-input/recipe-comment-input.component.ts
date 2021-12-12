import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { errorHandler } from 'src/app/core/utils/errorHandler';
import { ApiService } from '../../../core/services/api.service';
import { isLoggedIn } from '../../../core/services/authGuard';
import { RecipeComment } from '../../../models/comment.model';

@Component({
  selector: 'app-recipe-comment-input',
  templateUrl: './recipe-comment-input.component.html',
  styleUrls: ['./recipe-comment-input.component.css']
})
export class RecipeCommentInputComponent {
  @Input() recipeID: string;
  @Output() comment = new EventEmitter<RecipeComment>();
  commentMessage: string = '';
  error: boolean = false;
  errorMessage: string = '';

  faPlus = faPlus;

  constructor(private apiService: ApiService, private guard: isLoggedIn) { }

  createComment() {
    if (this.guard.canActivate()) {
      this.apiService.createComment(this.recipeID, this.commentMessage).subscribe((comment: RecipeComment) => {
        this.comment.emit(comment);
        this.commentMessage = '';
        this.error = false;
      }, error => {
        this.error = true;
        this.errorMessage = errorHandler(error);
      });
    } else {
      this.error = true;
      this.errorMessage = "You must be logged in to comment.";
    }
  }
}
