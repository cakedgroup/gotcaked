import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../core/services/api.service';
import { RecipeComment } from '../../../models/comment.model';
import { AuthService } from '../../../core/services/auth.service';
import { isLoggedIn } from '../../../core/services/authGuard';

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
        if (error.error.errors){
          this.errorMessage = error.error.errors[0].msg;
        } else {
          this.errorMessage = error.error.message;
        }
      });
    } else {
      this.error = true;
      this.errorMessage = "You must be logged in to comment.";
    }
  }
}
