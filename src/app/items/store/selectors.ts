import { createSelector, createFeatureSelector } from '@ngrx/store';
import { head } from 'ramda';

import { ItemState, itemStoreFeatureName } from './state';

export const getState = createFeatureSelector<ItemState>(itemStoreFeatureName);

export const getError = createSelector(
  getState,
  state => state.error,
);

export const getIsBusy = createSelector(
  getState,
  state => state.isBusy,
);

export const getAll = createSelector(
  getState,
  state => state.entities,
);

export const getSelectedId = createSelector(
  getState,
  (items: ItemState) => items.selectedItemId,
);

export const getSelected = createSelector(
  getAll,
  getSelectedId,
  (items, id) => head(items.filter(i => i.id === id)),
);
