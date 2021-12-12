import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Status } from 'src/app/models/status.model';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  status: Status;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getStatus();
  }

  getStatus() {
    this.apiService.getStatus().subscribe(status => {
      this.status = status;
    }, error => {
      console.log(error);
    });
  }
}
