import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, ObservableInput } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

import { AppState, itemActions } from '../common/state';
import { ItemService } from '../common';
import { Item, StockLevel } from '../common/models';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styles: [`
    .low-stock { color: red; }
  `],
})
export class ItemListComponent implements OnInit {
  StockLevel = StockLevel;
  public model;

  constructor(
    private store: Store<AppState>,
    private itemService: ItemService,
  ) { }

  ngOnInit() {
    this.model = this.itemService.selectAll();
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
