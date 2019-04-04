import { createSelector, createFeatureSelector } from '@ngrx/store';
import { head } from 'ramda';

import { ItemsState, itemsStoreFeatureName } from './state';

export const getState = createFeatureSelector<ItemsState>(
  itemsStoreFeatureName,
);

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
  (items: ItemsState) => items.selectedItemId,
);

export const getSelected = createSelector(
  getAll,
  getSelectedId,
  (items, id) => head(items.filter(i => i.id === id)),
);
