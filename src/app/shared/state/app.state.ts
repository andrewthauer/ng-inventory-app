import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, createSelector, Store, combineReducers } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';

import * as itemState from './item.state';
import * as uiState from './ui.state';

// ----------------------------------------------
// State

export interface AppState {
  router: any;
  ui: uiState.UiState;
  data: {
    items: itemState.ItemState;
  };
}

export const INITIAL_APP_STATE: AppState = {
  router: {},
  ui: uiState.INITIAL_UI_STATE,
  data: {
    items: itemState.INITIAL_ITEM_STATE
  },
};

// ----------------------------------------------
// Store

// Note Yet

// ----------------------------------------------
// Actions

// None Yet

// ----------------------------------------------
// Selectors

// None Yet

// ----------------------------------------------
// Reducers

export const rootReducer = {
  router: routerReducer,
  ui: uiState.uiReducer,
  data: combineReducers({
    items: itemState.itemsReducer
  })
};

// ----------------------------------------------
// Effects

export const allEffects = [
  itemState.ItemEffects
];
