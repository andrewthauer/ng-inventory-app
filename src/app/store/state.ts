import { RouterState, routerInitialState } from './router';
import { UiState, uiInitialState } from './ui';

export interface AppState {
  router: RouterState;
  ui: UiState;
}

export const appInitialState: AppState = {
  router: routerInitialState,
  ui: uiInitialState,
};
