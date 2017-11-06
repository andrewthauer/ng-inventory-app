import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, createSelector } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import * as itemStore from './item.state';

// ----------------------------------------------
// State

export interface UiState {
  selectedItemId: number;
}

export const INITIAL_UI_STATE: UiState = {
  selectedItemId: null
};

// ----------------------------------------------
// Actions

class SelectItemAction implements Action {
  static TYPE = 'SELECT_ITEM';
  type = SelectItemAction.TYPE;
  constructor(public payload: number) { }
  static create(id: number) { return new SelectItemAction(id); }
}

// ----------------------------------------------
// Selectors

// None Yet

// ----------------------------------------------
// Reducers

const selectItemId = (state, action) => {
  return { ...state, selectedItemId: action.payload };
};

export const uiReducer = (state = INITIAL_UI_STATE, action) => {
  switch (true) {
    case (action.type === itemStore.itemActions.selectItem.type):
      return selectItemId(state, action);
    default:
      return state;
  }
};

// ----------------------------------------------
// Effects

// TODO
