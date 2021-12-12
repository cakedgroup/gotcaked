import { Component, Input } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.css']
})
export class TagItemComponent {
  @Input() tags: Tag[];

  constructor() { }
}
