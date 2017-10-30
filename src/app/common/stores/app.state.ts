import { Store } from '@ngrx/store';

import * as itemStore from './item.store';

export interface AppState {
  items: itemStore.ItemsState;
}

export const INITIAL_APP_STATE: AppState = {
  items: itemStore.INITIAL_ITEMS_STATE
};

export const appReducer = {
  items: itemStore.itemsReducer
};
