import { Component, Input, OnInit } from '@angular/core';
import { RecipeComment } from 'src/app/models/comment.model';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-recipe-comments',
  templateUrl: './recipe-comments.component.html',
  styleUrls: ['./recipe-comments.component.css']
})
export class RecipeCommentsComponent implements OnInit {
  @Input() comment: RecipeComment;
  userName: string;

  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.getUserName();
  }

  getUserName(){
    this.apiService.getUser(this.comment.user_id).subscribe(user => {
      this.userName = user.name;
    });
  }

}
