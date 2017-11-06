import { combineReducers } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { uiReducer } from './ui-store';
import { itemsReducer } from '../features/items/store';

export const rootReducer = {
  router: routerReducer,
  ui: uiReducer,
  data: combineReducers({
    items: itemsReducer
  })
};
