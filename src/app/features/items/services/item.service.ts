import { Injectable } from '@angular/core';
import { compose, filter, head, ifElse, pipe } from 'ramda';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { Store } from '@ngrx/store';
import { AppState } from '../../../store';

import { Item, itemKeySelector } from '../models';
import { itemActions } from '../store/actions';
import { ItemPersistenceService } from './item-persistence.service';

const buildItem = (code = 'NEW', name = 'New Item', description = ''): Item => {
  return { code, name, description, quantity: 0 };
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
      this.store.select(state => state.data.items.isBusy),
      (items, error, isBusy) => {
        return { items, error, isBusy };
      }
    );
  }

  selectOne(id: number = null) {
    this.store.dispatch(itemActions.selectItem(id));
    this.fetchItem(id);

    const itemSelector = this.store.select(state => state.data.items.items)
      .map(items => head(items.filter(i => i.id === id)));

    // const itemPredicate = (key: number) => (item: Item) => itemKeySelector(item) === key;
    // const itemSelector = this.store
    //   .select(state => state.data.items.items)
    //   .map();

    // const i: Item = <Item>{};
    // const i: Item[] = [];
    // const a = head(filter(itemPredicate(id))(i));
    // const b = head(filter(itemPredicate(id))(i));

    return Observable.combineLatest(
      itemSelector,
      this.store.select(state => state.data.items.error),
      this.store.select(state => state.data.items.isBusy),
      (item, error, isBusy) => ({ item, error, isBusy })
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

  saveItem(item: Item) {
    this.store.dispatch(itemActions.saveItem.started(item));
  }

  deleteItem(item: Item) {
    this.store.dispatch(itemActions.deleteItem.started(item));
  }
}
