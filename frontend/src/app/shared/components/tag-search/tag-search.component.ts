import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Tag } from 'src/app/models/tag.model';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-tag-search',
  templateUrl: './tag-search.component.html',
  styleUrls: ['./tag-search.component.css']
})
export class TagSearchComponent implements OnInit {
  @Output() tagSelected = new EventEmitter<Tag>();
  tags: Tag[];
  tempTag: Tag = {
    name: "",
    description: "",
  };

  faPlus = faPlus;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getTags();
  }

  getTags() {
    this.apiService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }

  addTag(tag: Tag) {
    if (tag.name.length > 0) {
      this.tagSelected.emit(tag);
      this.tempTag.name = "";
      this.tempTag.description = "";
    }
  }
}
