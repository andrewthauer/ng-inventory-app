import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ifElse, identity } from 'ramda';
import { Observable, combineLatest } from 'rxjs';

import { routerActions } from '../../store';
import { ModalService } from '../../core';
import { Item, StockLevel, calcStockLevel, ItemFilters } from '../models';
import { ItemsState, itemActions } from '../store';
import * as itemSelectors from '../store/selectors';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styles: [
    `
      .low-stock {
        color: red;
      }
    `,
  ],
})
export class ItemListComponent implements OnInit {
  StockLevel = StockLevel;

  @Input() searchText: string;
  public model;

  constructor(private store: Store<ItemsState>, private modal: ModalService) {
    this.model = combineLatest(
      this.store.select(itemSelectors.getAll),
      this.store.select(itemSelectors.getIsBusy),
      this.store.select(itemSelectors.getError),
      (entities, isBusy, error) => ({ entities, isBusy, error }),
    );
  }

  ngOnInit() {
    this.store.dispatch(itemActions.loadAll.started(null));
  }

  addItem() {
    this.store.dispatch(itemActions.addOne.started(null));
  }

  deleteItem(item: Item) {
    this.modal
      .confirm('Are you sure?')
      .subscribe(
        ifElse(
          identity,
          () => this.store.dispatch(itemActions.removeOne.started(item)),
          () => false,
        ),
      );
  }

  navigateToItemDetails(item) {
    this.store.dispatch(routerActions.go({ path: ['/items', item.id] }));
  }

  stockLevel(item: Item) {
    return calcStockLevel(item);
  }

  onFilterChanged(searchText) {
    const filters: ItemFilters = { searchText };
    this.store.dispatch(itemActions.setFilters(filters));
  }

  quantityChanged(item: Item, newQuantity) {
    const newItem: Item = { ...item, quantity: newQuantity };
    this.store.dispatch(itemActions.saveOne.started(newItem));
  }
}
