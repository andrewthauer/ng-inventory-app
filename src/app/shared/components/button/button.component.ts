import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconType } from '../../icon-type';

@Component({
  selector: 'app-button',
  template: `
    <button
      [ngClass]="{ 'pa3 white br3 bs--none': true, 'bg-gray': !disabled, 'bg-light-gray': disabled }"
      [type]="type"
      [disabled]="disabled"
      (click)="onClick()"
    >
      <i [ngClass]="['fa', 'fa-' + icon]" *ngIf="icon && !icon.none"></i>
      {{ text }}
    </button>
  `
})
export class ButtonComponent implements OnInit {
  IconType = IconType;

  @Input() text = '';
  @Input() type = 'button';
  @Input() disabled = false;
  @Input() icon: IconType | string = IconType.none;
  @Output() click: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onClick(e: any) {
    this.click.emit(e);
  }
}
