import { Action, createSelector } from '@ngrx/store';
import { ItemState, itemActions } from '../items/store';

export interface UiState {
  someValue: any;
}

export const uiInitialState: UiState = {
  someValue: null
};

export const uiReducer = (state = uiInitialState, action) => {
  switch (true) {
    default:
      return state;
  }
};
