import { routerReducer } from '@ngrx/router-store';
import { appInitialState } from './state';
import { uiReducer } from '../core';

export const rootReducer = {
  router: routerReducer,
  ui: uiReducer
};
