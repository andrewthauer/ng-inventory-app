import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import { appError } from '../../../utils';
import { FsaAction } from '../../../lib/ngrx-fsa';

import { Item } from '../models';
import { ItemPersistenceService } from '../services';
import { itemActions } from './actions';

const DELAY_SIMULATION = 500;

@Injectable()
export class ItemEffects {
  constructor(
    private actions$: Actions,
    private persistence: ItemPersistenceService,
  ) { }

  @Effect()
  loadItems$ = this.actions$
    .ofType<FsaAction<Item[]>>(itemActions.loadItems.started.type)
    .switchMap(() => this.persistence.getItems())
    .delay(DELAY_SIMULATION)
    .map(items => itemActions.loadItems.done(items))
    .catch(err => of(itemActions.loadItems.failed(appError(err))));

  @Effect()
  loadItem$ = this.actions$
    .ofType<FsaAction<number>>(itemActions.loadItem.started.type)
    .map(action => action.payload)
    .switchMap(id => this.persistence.getItem(id))
    .delay(DELAY_SIMULATION)
    .map(item => itemActions.loadItem.done(item))
    .catch(err => of(itemActions.loadItem.failed(appError(err))));

  @Effect()
  addItem$ = this.actions$
    .ofType<FsaAction<Item>>(itemActions.addItem.started.type)
    .map(action => action.payload)
    .switchMap(item => this.persistence.saveItem(item))
    .map(item => itemActions.addItem.done(item))
    .catch(err => of(itemActions.addItem.failed(appError(err))));

  @Effect()
  saveItem$ = this.actions$
    .ofType<FsaAction<Item>>(itemActions.saveItem.started.type)
    .map(action => action.payload)
    .switchMap(item => this.persistence.saveItem(item))
    .delay(DELAY_SIMULATION)
    .map(item => itemActions.saveItem.done(item))
    .catch(err => of(itemActions.saveItem.failed(appError(err))));

  @Effect()
  deleteItem$ = this.actions$
    .ofType<FsaAction<Item>>(itemActions.deleteItem.started.type)
    .map(action => action.payload)
    .switchMap(item => this.persistence.deleteItem(item))
    .delay(DELAY_SIMULATION)
    .map(item => itemActions.deleteItem.done(item))
    .catch(err => of(itemActions.deleteItem.failed(appError(err))));
}
