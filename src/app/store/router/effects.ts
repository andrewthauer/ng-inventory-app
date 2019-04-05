import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { Action as FsaAction } from 'typescript-fsa';

import { routerActions, RouterActionPayload } from './actions';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
  ) {}

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType<FsaAction<RouterActionPayload>>(routerActions.go.type),
    map(action => action.payload),
    tap(({ path, query: queryParams, extras }) =>
      this.router.navigate(path, { queryParams, ...extras }),
    ),
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType(routerActions.back.type),
    tap(() => this.location.back()),
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    ofType(routerActions.forward.type),
    tap(() => this.location.forward()),
  );
}
