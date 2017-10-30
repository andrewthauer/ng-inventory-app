import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Item } from '../models';
import { ItemPersistenceService } from './item-persistence.service';
import { AppState, itemActions } from '../stores';

const buildItem = (code = 'New Item', name?: string): Item => {
  return { code, name };
};

@Injectable()
export class ItemService {
  constructor(
    private peristence: ItemPersistenceService,
    private store: Store<AppState>,
  ) { }

  select() {
    this.loadItems();
    return {
      items: this.store.select((state: AppState) => state.items.items),
      error: this.store.select((state: AppState) => state.items.error)
    };
  }

  loadItems() {
    this.store.dispatch(itemActions.loadItems.started(null));
  }

  addItem(item: Item = null) {
    const newItem = item || buildItem();
    this.store.dispatch(itemActions.addItem.started(newItem));
  }

  removeItem(item: Item) {
    this.store.dispatch(itemActions.deleteItem.started(item));
  }
}
