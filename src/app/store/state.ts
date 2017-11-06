import { UiState, INITIAL_UI_STATE} from './ui-store';
import { ItemState, INITIAL_ITEM_STATE } from '../features/items/store';

// ----------------------------------------------
// State

export interface AppState {
  router: any;
  ui: UiState;
  data: {
    items: ItemState;
  };
}

export const INITIAL_APP_STATE: AppState = {
  router: {},
  ui: INITIAL_UI_STATE,
  data: {
    items: INITIAL_ITEM_STATE
  },
};
