import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent {
  @Input() tags: Tag[];
  @Output() tagsChange = new EventEmitter<Tag[]>();
  @Output() delete: EventEmitter<Tag> = new EventEmitter();

  //FA-Icons
  faTrash = faTrash;

  constructor() { }

  deleteHandler(tag: Tag) {
    this.delete.emit(tag);
  }
}
