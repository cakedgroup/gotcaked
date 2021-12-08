import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCheckCircle, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-form-create-field',
  templateUrl: './form-create-field.component.html',
  styleUrls: ['./form-create-field.component.css']
})
export class FormCreateFieldComponent {
  @Input() model_type: string;
  @Input() model: any;
  @Output() modelChange = new EventEmitter<any>();

  //FA-Icons
  faTrash = faTrash;
  faCheckCircle = faCheckCircle;
  faPlus = faPlus;

  constructor() { }
}
