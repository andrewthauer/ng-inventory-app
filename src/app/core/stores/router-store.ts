import { Injectable } from '@angular/core';
import { Router, NavigationExtras, RouterStateSnapshot, Params } from '@angular/router';
import { RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { Location } from '@angular/common';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { actionCreatorFactory, FsaAction } from '../../../lib/ts-redux-fsa';

// Store feature name
export const routerStoreFeatureName = 'router';

// State
export interface RouterActionPayload {
  path: string[] | any[];
  query?: object;
  extras?: NavigationExtras;
}

export type RouterState = any;
export const routerInitialState = {};

// Selectors
const getState = state => <RouterState>state.router;
export const getCurrentUrl = createSelector(getState, (state: RouterState) => state.state && state.state.url);

// Actions
const actionCreator = actionCreatorFactory();

export const routerActions = {
  go: actionCreator<RouterActionPayload>('ROUTER_GO'),
  forward: actionCreator('ROUTER_FORWARD'),
  back: actionCreator('ROUTER_BACK'),
};

// Effects
@Injectable()
export class RouterEffects {
  @Effect({ dispatch: false })
  navigate$ = this.actions$
    .ofType<FsaAction<RouterActionPayload>>(routerActions.go.type)
    .map(action => action.payload)
    .do(({ path, query: queryParams, extras}) => this.router.navigate(path, { queryParams, ...extras }));

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
    .ofType<FsaAction<RouterActionPayload>>(routerActions.back.type)
    .do(() => this.location.back());

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
    .ofType<FsaAction<RouterActionPayload>>(routerActions.forward.type)
    .do(() => this.location.forward());

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) { }
}

/**
 * The RouterStateSerializer takes the current RouterStateSnapshot
 * and returns any pertinent information needed. The snapshot contains
 * all information about the state of the router at the given point in time.
 * The entire snapshot is complex and not always needed. In this case, you only
 * need the URL and query parameters from the snapshot in the store. Other items could be
 * returned such as route parameters and static route data.
 */
export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const queryParams = routerState.root.queryParams;
    return { url, queryParams };
  }
}
