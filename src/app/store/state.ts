import { UiState, uiInitialState} from './ui-store';
import { ItemState, itemsInitialState } from '../items/store';

export interface AppState {
  router: any;
  ui: UiState;
  items: ItemState;
}

export const appInitialState: AppState = {
  router: {},
  ui: uiInitialState,
  items: itemsInitialState
};
