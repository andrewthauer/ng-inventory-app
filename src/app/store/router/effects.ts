import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { FsaAction } from 'lib/ts-redux-fsa';
import { routerActions } from './actions';
import { RouterActionPayload } from './state';

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
