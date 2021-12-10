import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getStatus();
  }

  getStatus() {
    this.apiService.getStatus().subscribe(
      (data) => {
      },
      (error) => {
      }
    );
  }
}
