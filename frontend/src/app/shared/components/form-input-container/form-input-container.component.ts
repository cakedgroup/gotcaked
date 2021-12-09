import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-input-container',
  templateUrl: './form-input-container.component.html',
  styleUrls: ['./form-input-container.component.css']
})
export class FormInputContainerComponent implements OnInit {
  @Input() fieldPlaceholder: string;
  @Input() fieldName: string;
  @Input() fieldInput: any;
  @Output() fieldInputChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.fieldName);
  }

}
