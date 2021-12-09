import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-textarea-container',
  templateUrl: './form-textarea-container.component.html',
  styleUrls: ['./form-textarea-container.component.css']
})
export class FormTextareaContainerComponent {
  @Input() fieldPlaceholder: string;
  @Input() fieldName: string;
  @Input() fieldInput: string;
  @Output() fieldInputChange = new EventEmitter<string>();


  constructor() { }

}
