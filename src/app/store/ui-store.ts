import { Action, createSelector } from '@ngrx/store';
import { ItemState, itemActions } from '../features/items/store';

export interface UiState {
  selectedItemId: number;
}

export const INITIAL_UI_STATE: UiState = {
  selectedItemId: null
};

class SelectItemAction implements Action {
  static TYPE = 'SELECT_ITEM';
  type = SelectItemAction.TYPE;
  constructor(public payload: number) { }
  static create(id: number) { return new SelectItemAction(id); }
}

const selectItemId = (state, action) => {
  return { ...state, selectedItemId: action.payload };
};

export const uiReducer = (state = INITIAL_UI_STATE, action) => {
  switch (true) {
    case (action.type === itemActions.selectItem.type):
      return selectItemId(state, action);
    default:
      return state;
  }
};
