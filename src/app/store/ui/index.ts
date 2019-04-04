export const uiStateKey = 'ui';

export interface UiState {
  someValue: any;
}

export const uiInitialState: UiState = {
  someValue: null,
};

export const reducer = (state = uiInitialState, action) => {
  switch (true) {
    default:
      return state;
  }
};

export function uiReducer(state: UiState = uiInitialState, action) {
  return reducer(state, action);
}
