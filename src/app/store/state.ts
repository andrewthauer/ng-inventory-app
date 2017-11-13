import { RouterState, routerInitialState } from '../core';
import { UiState, uiInitialState } from '../core';
import { ItemsState, itemsInitialState } from '../items/store';

export interface AppState {
  router: RouterState;
  ui: UiState;
  items: ItemsState;
}

export const appInitialState: AppState = {
  router: routerInitialState,
  ui: uiInitialState,
  items: itemsInitialState
};
