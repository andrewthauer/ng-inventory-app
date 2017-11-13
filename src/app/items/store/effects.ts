import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { curry } from 'ramda';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { FsaAction } from '../../../lib/ts-redux-fsa';
import { AppError, ToastService } from '../../core';
import { routerActions } from '../../store';

import { Item, ItemFilters } from '../models';
import { ItemsState } from './state';
import { itemActions } from './actions';
import { ItemPersistenceService } from '../services';

const DELAY_SIMULATION = 250;

const handleError = curry((toast: ToastService, msg: string, action: Function, err: any) => {
  toast.error(msg);
  return of(action(AppError.of(err)));
});

// const handleSuccess = curry((toast: ToastService, msg: string, action: Function, payload: any) => {
//   toast.success(msg);
//   return action(payload);
// });

@Injectable()
export class ItemsEffects {
  @Effect()
  setItemsFilter$ = this.actions$
    .ofType<FsaAction<ItemFilters>>(itemActions.setFilters.type)
    .debounceTime(200)
    .map(action => action.payload)
    .map(filters => itemActions.loadAll.started(filters));

  @Effect()
  loadItems$ = this.actions$
    .ofType<FsaAction<ItemFilters>>(itemActions.loadAll.started.type)
    .map(action => action.payload)
    .switchMap(filters => this.persistence.getItems(filters))
    .delay(DELAY_SIMULATION)
    .map(items => itemActions.loadAll.done(items))
    .catch(handleError(this.toast, 'Load All Failed', itemActions.loadAll.failed));

  @Effect()
  loadItem$ = this.actions$
    .ofType<FsaAction<number>>(itemActions.loadOne.started.type)
    .map(action => action.payload)
    .switchMap(id => this.persistence.getItem(id))
    .delay(DELAY_SIMULATION)
    .map(item => itemActions.loadOne.done(item))
    .catch(handleError(this.toast, 'Load Item Failed', itemActions.loadOne.failed));

  @Effect()
  addItem$ = this.actions$
    .ofType<FsaAction<Item>>(itemActions.addOne.started.type)
    .map(action => action.payload)
    .switchMap(item => this.persistence.saveItem(item))
    .map(item => itemActions.addOne.done(item))
    .do(() => this.toast.success('Item Added'))
    .catch(handleError(this.toast, 'Add Item Failed', itemActions.addOne.failed));

  @Effect()
  saveItem$ = this.actions$
    .ofType<FsaAction<Item>>(itemActions.saveOne.started.type)
    .debounceTime(500)
    .map(action => action.payload)
    .switchMap(item => this.persistence.saveItem(item))
    .delay(DELAY_SIMULATION)
    .map(item => itemActions.saveOne.done(item))
    .do(() => this.toast.success('Item Saved'))
    // NOTE: This is used in multiple places, consider decoupling navigation from the effect
    // or potentially making the actions more fine grained
    // or only do this if we are not on this screen
    .map(action => routerActions.go({ path: ['/items'] }))
    .catch(handleError(this.toast, 'Save Item Failed', itemActions.saveOne.failed));

  @Effect()
  deleteItem$ = this.actions$
    .ofType<FsaAction<Item>>(itemActions.removeOne.started.type)
    .map(action => action.payload)
    .switchMap(item => this.persistence.deleteItem(item))
    .delay(DELAY_SIMULATION)
    .map(item => itemActions.removeOne.done(item))
    .do(() => this.toast.success('Item Deleted'))
    .catch(handleError(this.toast, 'Remove Item Failed', itemActions.removeOne.failed));

  constructor(
    private store: Store<ItemsState>,
    private actions$: Actions,
    private persistence: ItemPersistenceService,
    private toast: ToastService,
  ) { }
}
