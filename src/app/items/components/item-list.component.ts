import { Component, OnInit, Input } from '@angular/core';
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

  @Input() searchText: string;
  public model;

  constructor(
    private store: Store<AppState>,
    private itemService: ItemService,
    private modal: ModalService
  ) { }

  ngOnInit() {
    this.searchText = '';
    this.model = this.itemService.selectAll();
  }

  addItem() {
    this.itemService.addItem();
  }

  deleteItem(item: Item) {
    this.modal.confirm('Are you sure?')
      .subscribe(ifElse(identity,
        () => this.store.dispatch(itemActions.deleteItem.started(item)),
        () => false
      ));
  }

  stockLevel(item: Item) {
    return calcStockLevel(item);
  }

  onFilterChanged(text) {
    this.store.dispatch(itemActions.setItemsFilter(text));
  }

  quantityChanged(item) {
    this.store.dispatch(itemActions.saveItem.started(item));
  }
}
