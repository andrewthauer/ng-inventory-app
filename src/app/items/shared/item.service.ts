import { Injectable } from '@angular/core';
import { compose, filter, head, ifElse, pipe } from 'ramda';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { Store } from '@ngrx/store';
import { AppState } from '../../store';

import { Item, itemKeySelector } from './item.model';
import { ItemPersistenceService } from './item-persistence.service';
import { itemActions } from '../store/actions';

const buildItem = (name = 'New Item', description = ''): Item => {
  return { name, description, quantity: 0 };
};

@Injectable()
export class ItemService {
  constructor(
    private peristence: ItemPersistenceService,
    private store: Store<AppState>,
  ) { }

  loadAndSelectAll() {
    this.store.dispatch(itemActions.loadAll.started());

    return Observable.combineLatest(
      this.store.select(state => state.items.items),
      this.store.select(state => state.items.error),
      this.store.select(state => state.items.isBusy),
      (items, error, isBusy) => {
        return { items, error, isBusy };
      }
    );
  }

  loadAndSelectOne(id: number = null) {
    this.store.dispatch(itemActions.selectOne(id));
    this.store.dispatch(itemActions.loadOne.started(id));

    const itemSelector = this.store.select(state => state.items.items)
      .map(items => head(items.filter(i => i.id === id)));

    // const itemPredicate = (key: number) => (item: Item) => itemKeySelector(item) === key;
    // const itemSelector = this.store
    //   .select(state => state.items.items)
    //   .map();

    // const i: Item = <Item>{};
    // const i: Item[] = [];
    // const a = head(filter(itemPredicate(id))(i));
    // const b = head(filter(itemPredicate(id))(i));

    return Observable.combineLatest(
      itemSelector,
      this.store.select(state => state.items.error),
      this.store.select(state => state.items.isBusy),
      (item, error, isBusy) => ({ item, error, isBusy })
    );
  }

  addItem(item: Item = null) {
    const newItem = item || buildItem();
    this.store.dispatch(itemActions.addOne.started(newItem));
  }

  saveItem(item: Item) {
    this.store.dispatch(itemActions.saveOne.started(item));
  }

  removeItem(item: Item) {
    this.store.dispatch(itemActions.removeOne.started(item));
  }
}
