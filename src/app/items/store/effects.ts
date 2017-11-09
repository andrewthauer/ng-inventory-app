import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { FsaAction } from '../../../lib/ts-redux-fsa';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import { Item, ItemPersistenceService } from '../shared';
import { itemActions } from './actions';
import { AppError } from '../../core';
import { ToastService } from '../../core/toast.service';

const DELAY_SIMULATION = 250;

@Injectable()
export class ItemEffects {
  constructor(
    private actions$: Actions,
    private persistence: ItemPersistenceService,
    private toast: ToastService,
  ) { }

  @Effect()
  setItemsFilter$ = this.actions$
    .ofType<FsaAction<string>>(itemActions.setItemsFilter.type)
    .debounceTime(200)
    .map(action => action.payload)
    .map(search => itemActions.loadItems.started(search));

  @Effect()
  loadItems$ = this.actions$
    .ofType<FsaAction<string>>(itemActions.loadItems.started.type)
    .map(action => action.payload)
    .switchMap(searchText => this.persistence.getItems(searchText))
    .delay(DELAY_SIMULATION)
    .map(items => itemActions.loadItems.done(items))
    .catch(err => {
      this.toast.error('Load Failed');
      return of(itemActions.loadItems.failed(AppError.of(err)));
    });

  @Effect()
  loadItem$ = this.actions$
    .ofType<FsaAction<number>>(itemActions.loadItem.started.type)
    .map(action => action.payload)
    .switchMap(id => this.persistence.getItem(id))
    .delay(DELAY_SIMULATION)
    .map(item => itemActions.loadItem.done(item))
    .catch(err => {
      this.toast.error('Load Failed');
      return of(itemActions.loadItem.failed(AppError.of(err)));
    });

  @Effect()
  addItem$ = this.actions$
    .ofType<FsaAction<Item>>(itemActions.addItem.started.type)
    .map(action => action.payload)
    .switchMap(item => this.persistence.saveItem(item))
    .map(item => itemActions.addItem.done(item))
    .do(() => this.toast.success('Item Added'))
    .catch(err => {
      this.toast.error('Add Failed');
      return of(itemActions.addItem.failed(AppError.of(err)));
    });

  @Effect()
  saveItem$ = this.actions$
    .ofType<FsaAction<Item>>(itemActions.saveItem.started.type)
    .debounceTime(500)
    .map(action => action.payload)
    .switchMap(item => this.persistence.saveItem(item))
    .delay(DELAY_SIMULATION)
    .map(item => itemActions.saveItem.done(item))
    .do(() => this.toast.success('Item Saved'))
    .catch(err => {
      this.toast.error('Save Failed');
      return of(itemActions.saveItem.failed(AppError.of(err)));
    });

  @Effect()
  deleteItem$ = this.actions$
    .ofType<FsaAction<Item>>(itemActions.deleteItem.started.type)
    .map(action => action.payload)
    .switchMap(item => this.persistence.deleteItem(item))
    .delay(DELAY_SIMULATION)
    .map(item => itemActions.deleteItem.done(item))
    .do(() => this.toast.success('Item Deleted'))
    .catch(err => {
      this.toast.error('Delete Failed');
      return of(itemActions.deleteItem.failed(AppError.of(err)));
    });
}
