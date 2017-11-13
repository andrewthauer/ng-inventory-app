import { Action, createSelector, createFeatureSelector } from '@ngrx/store';

export const uiStoreFeatureName = 'ui';

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
