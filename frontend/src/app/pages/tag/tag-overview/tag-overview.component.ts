import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-tag-overview',
  templateUrl: './tag-overview.component.html',
  styleUrls: ['./tag-overview.component.css']
})
export class TagOverviewComponent implements OnInit {
  tags: Tag[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTags();
  }

  getTags() {
    this.apiService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }
}
