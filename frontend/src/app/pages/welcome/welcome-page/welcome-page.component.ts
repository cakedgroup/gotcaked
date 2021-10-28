import {Component, OnInit} from '@angular/core';
import {Echo} from "../../../models/echo.model";
import {ApiService} from "../../../core/services/api.service";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  createInput: string;
  filterInput: string;

  echos: Echo[];

  constructor(private apiService: ApiService) {
    this.loadEchos();
  }

  ngOnInit(): void {
  }

  addEcho(): void {
    this.apiService.createEcho({
      message: this.createInput
    }).subscribe((data: Echo) => {
      if (this.echos) {
        this.echos.push(data);
        this.echos.sort((a, b) => a.message.localeCompare(b.message));
      } else {
        this.echos = [data];
      }
    });
  }

  loadEchos(): void {
    this.apiService.getEchos(this.filterInput)
      .subscribe((data: Echo[]) => {
        this.echos = data;
        this.echos.sort((a, b) => a.message.localeCompare(b.message));
      });
  }

  error(): void {
    this.apiService.doError().subscribe((data: Echo) => {
      console.log(data);
    }, (error: any) => {
      console.log('In Component:', error);
    });
  }
}
