import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subscription } from 'rxjs/subscription';
import { Store } from '@ngrx/store';
import * as R from 'ramda';

import { AppState, ItemsState, ItemActions } from '../common/stores';
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
  ItemActions = ItemActions;

  items: Observable<Item[]>;
  error: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private itemService: ItemService,
  ) {
  }

  ngOnInit() {
    this.items = this.store.select((state: AppState) => state.items.list);
    this.error = this.store.select((state: AppState) => state.items.error);
    this.itemService.loadItems();
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
