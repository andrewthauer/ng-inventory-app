import { routerReducer } from '@ngrx/router-store';
import { appInitialState } from './state';
import { uiReducer } from './ui-store';
import { itemsReducer } from '../items/store';

export const rootReducer = {
  router: routerReducer,
  ui: uiReducer,
  items: itemsReducer
};
