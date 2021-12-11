import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent {
  @Input() type: string = "text";
  @Input() label: string;
  @Input() value: any
  @Output() valueChange = new EventEmitter<any>();

  constructor() { }

  onChange(value: string) {
    this.value = value;
    this.valueChange.emit(value);
  }

}
