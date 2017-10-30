import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';

import { AppState, itemActions } from '../common/stores';
import { ItemService } from '../common';
import { Item, StockLevel } from '../common/models';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styles: [`
    .low-stock { color: red; }
  `],
})
export class ItemListComponent implements OnInit {
  StockLevel = StockLevel;

  items: Observable<Item[]>;
  error: Observable<Error>;

  constructor(
    private itemService: ItemService,
  ) { }

  ngOnInit() {
    const result = this.itemService.select();
    this.items = result.items;
    this.error = result.error;
  }

  getItems() {
    return this.items;
  }

  addItem() {
    this.itemService.addItem();
  }

  removeItem(item: Item) {
    this.itemService.removeItem(item);
  }

  stockLevel(item: Item): StockLevel {
    if (item.quantity === 0) {
      return StockLevel.out;
    } else if (item.quantity <= 2) {
      return StockLevel.low;
    } else if (item.quantity >= 100) {
      return StockLevel.overstock;
    } else {
      return StockLevel.ok;
    }
  }

  hasLowStock(item: Item): boolean {
    return item.quantity <= 1;
  }

  hasAnyLowStock() {
    return false;
  }

  onQuantityChange(newQuantity) {
    console.log(`Quantity changed: ${newQuantity}`);
  }
}
