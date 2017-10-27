import { Store } from '@ngrx/store';
import * as itemStore from './item.state';

export interface AppState {
  items: itemStore.ItemsState;
}

export const INITIAL_APP_STATE: AppState = {
  items: itemStore.INITIAL_ITEMS_STATE
};

// export type AppStore = Store<AppState>;
