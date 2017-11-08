import { Component, OnInit } from '@angular/core';
import { ifElse, identity } from 'ramda';

import { Store } from '@ngrx/store';
import { AppState } from '../../store';

import { ModalService } from '../../core/modal.service';
import { Item, ItemService, StockLevel, calcStockLevel } from '../shared';
import { itemActions } from '../store';

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
    private modal: ModalService
  ) { }

  ngOnInit() {
    this.model = this.itemService.selectAll();
  }

  addItem() {
    this.itemService.addItem();
  }

  deleteItem(item: Item) {
    this.modal.confirm('Are you sure?')
      .subscribe(ifElse(identity,
        () => this.itemService.deleteItem(item),
        () => false
      ));
  }

  stockLevel(item: Item) {
    return calcStockLevel(item);
  }

  hasLowStock(item: Item): boolean {
    return item.quantity <= 1;
  }

  hasAnyLowStock() {
    return false;
  }

  quantityChanged(item, newQuantity) {
    this.itemService.saveItem({
      ...item,
      quantity: newQuantity
    });
  }
}
