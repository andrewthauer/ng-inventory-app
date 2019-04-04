import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { curry } from 'ramda';
import { of } from 'rxjs';
import {
  catchError,
  debounceTime,
  delay,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import { Action as FsaAction } from 'typescript-fsa';
import { AppError, ToastService } from '../../core';
import { Item, ItemFilters } from '../models';
import { itemActions } from './actions';
import { ItemPersistenceService } from '../services';

const DELAY_SIMULATION = 500;

const handleError = curry(
  (toast: ToastService, msg: string, action: Function, err: any) => {
    toast.error(msg);
    return of(action(AppError.of(err)));
  },
);

// const handleSuccess = curry((toast: ToastService, msg: string, action: Function, payload: any) => {
//   toast.success(msg);
//   return action(payload);
// });

@Injectable()
export class ItemsEffects {
  @Effect()
  setItemsFilter$ = this.actions$.pipe(
    ofType<FsaAction<ItemFilters>>(itemActions.setFilters.type),
    debounceTime(200),
    map(action => action.payload),
    map(filters => itemActions.loadAll.started(filters)),
  );

  @Effect()
  loadItems$ = this.actions$.pipe(
    ofType<FsaAction<ItemFilters>>(itemActions.loadAll.started.type),
    map(action => action.payload),
    switchMap(filters =>
      this.persistence
        .getItems(filters)
        .pipe(
          catchError(
            handleError(
              this.toast,
              'Load All Failed',
              itemActions.loadAll.failed,
            ),
          ),
        ),
    ),
    delay(DELAY_SIMULATION),
    map(items => itemActions.loadAll.done({ params: null, result: items })),
  );

  @Effect()
  loadItem$ = this.actions$.pipe(
    ofType<FsaAction<number>>(itemActions.loadOne.started.type),
    map(action => action.payload),
    switchMap(id =>
      this.persistence
        .getItem(id)
        .pipe(
          catchError(
            handleError(
              this.toast,
              'Load Item Failed',
              itemActions.loadOne.failed,
            ),
          ),
        ),
    ),
    delay(DELAY_SIMULATION),
    map(item => itemActions.loadOne.done({ params: null, result: item })),
  );

  @Effect()
  addItem$ = this.actions$.pipe(
    ofType<FsaAction<Item>>(itemActions.addOne.started.type),
    map(action => action.payload),
    switchMap(item =>
      this.persistence
        .saveItem(item)
        .pipe(
          catchError(
            handleError(
              this.toast,
              'Add Item Failed',
              itemActions.addOne.failed,
            ),
          ),
        ),
    ),
    map(item => itemActions.addOne.done({ params: null, result: item })),
    tap(() => this.toast.success('Item Added')),
  );

  @Effect()
  saveItem$ = this.actions$.pipe(
    ofType<FsaAction<Item>>(itemActions.saveOne.started.type),
    debounceTime(500),
    map(action => action.payload),
    switchMap(item =>
      this.persistence
        .saveItem(item)
        .pipe(
          catchError(
            handleError(
              this.toast,
              'Save Item Failed',
              itemActions.saveOne.failed,
            ),
          ),
        ),
    ),
    delay(DELAY_SIMULATION),
    map(item => itemActions.saveOne.done({ params: null, result: item })),
    tap(() => this.toast.success('Item Saved')),
    // NOTE: This is used in multiple places, consider decoupling navigation from the effect
    // or potentially making the actions more fine grained
    // or only do this if we are not on this screen
    // .map(action => routerActions.go({ path: ['/items'] }))
  );

  @Effect()
  deleteItem$ = this.actions$.pipe(
    ofType<FsaAction<Item>>(itemActions.removeOne.started.type),
    map(action => action.payload),
    switchMap(item =>
      this.persistence
        .deleteItem(item)
        .pipe(
          catchError(
            handleError(
              this.toast,
              'Remove Item Failed',
              itemActions.removeOne.failed,
            ),
          ),
        ),
    ),
    delay(DELAY_SIMULATION),
    map(item => itemActions.removeOne.done({ params: null, result: item })),
    tap(() => this.toast.success('Item Deleted')),
  );

  constructor(
    private actions$: Actions,
    private persistence: ItemPersistenceService,
    private toast: ToastService,
  ) {}
}
