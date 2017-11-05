import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IconType } from './icon-type';

@Component({
  selector: 'app-button',
  template: `
    <button class="pa2 bg-gray white" (click)="onClick()">
      <i [ngClass]="['fa', 'fa-' + icon]" *ngIf="icon && !icon.none"></i>
      {{ text }}
    </button>
  `
})
export class ButtonComponent implements OnInit {
  IconType = IconType;

  @Input() text = '';
  @Input() icon: IconType | string = IconType.none;
  @Output() click: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  private onClick(e: any) {
    this.click.emit(e);
  }
}
