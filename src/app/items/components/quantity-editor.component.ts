import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Item } from '../models';

export interface QuantityChangedEventArgs {
  item: Item;
  newQuantity: number;
}

@Component({
  selector: 'app-quantity-editor',
  template: `
    <span>
      <button class="br2 pa2 white bg-mid-gray" (click)="decreaseQty()"><i class="fa fa-minus"></i></button>
      <button class="br2 pa2 white bg-mid-gray" (click)="increaseQty()"><i class="fa fa-plus"></i></button>
    </span>
  `
})
export class QuantityEditorComponent implements OnInit {
  @Input() quantity: number;
  @Output() change = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  increaseQty() {
    this.quantity++;
    this.notifyChangeEvent(this.quantity);
  }

  decreaseQty() {
    this.quantity--;
    this.notifyChangeEvent(this.quantity);
  }

  private notifyChangeEvent(newQuantity) {
    this.change.emit(newQuantity);
  }
}
