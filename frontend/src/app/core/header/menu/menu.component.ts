import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService, private headerComponent: HeaderComponent) {

  }

  ngOnInit(): void {
    console.log("hello");
  }

  disableMenu() {
    this.headerComponent.disableUserMenu();
  }

  enableMenu() {
    this.headerComponent.enableUserMenu();
  }

}
