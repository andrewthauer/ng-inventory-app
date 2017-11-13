import { createSelector, createFeatureSelector } from '@ngrx/store';

import { routerActions } from './actions';
import { RouterState, routerStateKey } from './state';

const getState = state => <RouterState>state[routerStateKey];

export const getCurrentUrl = createSelector(getState, (state: RouterState) => state.state && state.state.url);
