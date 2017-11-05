import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconType } from './icon-type';

@Component({
  selector: 'app-button',
  template: `
    <button class="pa2 bg-gray white" [type]="type" (click)="onClick()">
      <i [ngClass]="['fa', 'fa-' + icon]" *ngIf="icon && !icon.none"></i>
      {{ text }}
    </button>
  `
})
export class ButtonComponent implements OnInit {
  IconType = IconType;

  @Input() text = '';
  @Input() type = 'button';
  @Input() icon: IconType | string = IconType.none;
  @Output() click: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  private onClick(e: any) {
    this.click.emit(e);
  }
}
