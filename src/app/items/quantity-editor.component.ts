import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { Item } from '../common/models';

// TODO: Expose event so parent can update itself

@Component({
  selector: 'quantity-editor',
  template: `
    <span>
      <button class="btn btn-xs" (click)="increaseQty(item)"><i class="fa fa-plus"></i></button>
      <button class="btn btn-xs" (click)="decreaseQty(item)"><i class="fa fa-minus"></i></button>
    </span>
  `
})
export class QuantityEditorComponent implements OnInit {
  @Input() item: Item;
  @Output() change = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }

  increaseQty(item: Item) {
    item.quantity++;
    this.notifyChangeEvent(item);
  }

  decreaseQty(item: Item) {
    item.quantity--;
    this.notifyChangeEvent(item);
  }

  private notifyChangeEvent(item) {
    this.change.emit(item.quantity);
  }
}
