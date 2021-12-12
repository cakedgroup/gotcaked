import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.css']
})
export class NoContentComponent {
  @Input() message: string = "No Content";
  constructor() { }
}
