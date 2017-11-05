import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as R from 'ramda';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { Item } from '../models';
import { ItemPersistenceService } from './item-persistence.service';
import { AppState, itemActions } from '../state';

const buildItem = (code = 'New Item', name?: string): Item => {
  return { code, name, quantity: 0 };
};

@Injectable()
export class ItemService {
  constructor(
    private peristence: ItemPersistenceService,
    private store: Store<AppState>,
  ) { }

  selectAll() {
    this.fetchItems();
    return Observable.combineLatest(
      this.store.select(state => state.data.items.items),
      this.store.select(state => state.data.items.error),
      this.store.select(state => state.data.items.isFetching),
      (items, error, isFetching) => {
        return { items, error, isFetching };
      }
    );
  }

  selectOne(id: number = null) {
    this.store.dispatch(itemActions.selectItem(id));
    this.fetchItem(id);

    const itemSelector = this.store.select(state => state.data.items.items)
      .map(items => R.head(items.filter(i => i.id === id)));

    return Observable.combineLatest(
      itemSelector,
      this.store.select(state => state.data.items.error),
      this.store.select(state => state.data.items.isFetching),
      (item, error, isFetching) => ({ item, error, isFetching })
    );
  }

  fetchItems() {
    this.store.dispatch(itemActions.loadItems.started());
  }

  fetchItem(id: number) {
    this.store.dispatch(itemActions.loadItem.started(id));
  }

  addItem(item: Item = null) {
    const newItem = item || buildItem();
    this.store.dispatch(itemActions.addItem.started(newItem));
  }

  removeItem(item: Item) {
    this.store.dispatch(itemActions.deleteItem.started(item));
  }
}
