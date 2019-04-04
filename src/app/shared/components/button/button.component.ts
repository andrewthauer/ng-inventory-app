import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      [ngClass]="{
        'pa3 white br3 bs--none': true,
        'bg-gray': !disabled,
        'bg-light-gray': disabled
      }"
      [type]="type"
      [disabled]="disabled"
      (click)="onClick($event)"
    >
      <i [ngClass]="['fa', 'fa-' + icon]" *ngIf="icon"></i>
      {{ text }}
    </button>
  `,
})
export class ButtonComponent implements OnInit {
  @Input() text = '';
  @Input() type = 'button';
  @Input() disabled = false;
  @Input() icon;
  @Output() click: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClick(e) {
    this.click.emit(e);
  }
}
