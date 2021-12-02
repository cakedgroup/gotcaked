import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../core/services/api.service";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  userName: string = 'TestUser';

  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    console.log("WelcomePage");
  }
}
