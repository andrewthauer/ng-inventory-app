import { StoreRouterConfig } from '@ngrx/router-store';
import { RouterState, routerInitialState, routerStateKey } from './router';
import { UiState, uiInitialState } from './ui';

// NOTE: `items` is configured as a feature store

export interface AppState {
  router: RouterState;
  ui: UiState;
}

export const appInitialState: AppState = {
  router: routerInitialState,
  ui: uiInitialState,
};

export const appStoreRouterConfig: StoreRouterConfig = {
  stateKey: routerStateKey,
};
