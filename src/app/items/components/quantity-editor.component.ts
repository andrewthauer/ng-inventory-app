import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Item } from '../shared';

@Component({
  selector: 'app-quantity-editor',
  template: `
    <span>
      <button class="br2 pa2 white bg-mid-gray" (click)="decreaseQty(item)"><i class="fa fa-minus"></i></button>
      <button class="br2 pa2 white bg-mid-gray" (click)="increaseQty(item)"><i class="fa fa-plus"></i></button>
    </span>
  `
})
export class QuantityEditorComponent implements OnInit {
  @Input() item: Item;
  @Output() change = new EventEmitter<{item: Item, newQuantity: number}>();

  constructor() { }

  ngOnInit() { }

  increaseQty(item: Item) {
    const newQuantity = item.quantity++;
    this.notifyChangeEvent({ ...item, newQuantity });
  }

  decreaseQty(item: Item) {
    const newQuantity = item.quantity--;
    this.notifyChangeEvent({ ...item, newQuantity });
  }

  private notifyChangeEvent(item) {
    this.change.emit(item);
  }
}
