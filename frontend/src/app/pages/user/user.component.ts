import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userName: string;
  user: User;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    //Updating User for new Route/Param
    this.route.params.subscribe(params => {
      this.userName = params.user;
      this.getUser();
    });
  }

  getUser() {
    this.apiService.getUser(this.userName).subscribe(
      (data: User) => {
        this.user = data;
      });
  }

}
