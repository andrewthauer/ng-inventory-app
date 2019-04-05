import { RouterReducerState } from '@ngrx/router-store';
import { routerReducer as storeRouterReducer } from '@ngrx/router-store';

import { RouterStateUrl } from './custom-router-state-serializer';

export type RouterState = RouterReducerState<RouterStateUrl>;

export const routerStateKey = 'router';
export const routerInitialState: RouterState = null;
export const routerReducer = storeRouterReducer;
