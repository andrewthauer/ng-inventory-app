import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, createSelector } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import * as R from 'ramda';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import * as fns from './common';
import { appError, upsert, remove } from '../utils';
import { actionCreatorFactory, isType, FsaAction, reducerWithInitialState } from '../../lib/ngrx-fsa';

import { Item } from '../models';
import { ItemPersistenceService } from '../services/item-persistence.service';

const DELAY_SIMULATION = 500;

// ----------------------------------------------
// State

export interface ItemState {
  items: Item[];
  error: Error;
  isBusy: boolean;
}

export const INITIAL_ITEM_STATE: ItemState = {
  items: [],
  error: null,
  isBusy: false
};

// ----------------------------------------------
// Actions

const actionCreator = actionCreatorFactory();

export const itemActions = {
  selectItem: actionCreator<number>('SELECT_ITEM'),
  loadItems: actionCreator.async<void, Item[], Error>('LOAD_ITEMS'),
  loadItem: actionCreator.async<number, Item, Error>('LOAD_ITEM'),
  addItem: actionCreator.async<Item, Item, Error>('ADD_ITEM'),
  saveItem: actionCreator.async<Item, Item, Error>('SAVE_ITEM'),
  deleteItem: actionCreator.async<Item, Item, Error>('DELETE_ITEM'),
  incrementQuantity: actionCreator.async<Item, Item, Error>('INCREMENT_QUANTITY'),
  decrementQuantity: actionCreator.async<Item, Item, Error>('DECREMENT_QUANTITY')
};

// ----------------------------------------------
// Selectors

export const itemSelector = (state: ItemState, id: number) => state.items.filter(item => item.id === id);

// ----------------------------------------------
// Reducers

const handleAsyncError = (state, err) => ({ ...fns.handleError(state, err), isBusy: false });

const startAsync = (state, payload: any) => ({
  ...state,
  isBusy: true
});

const upsertItem = (state, item: Item) => ({
  ...state,
  items: upsert(i => i.id, item, state.items),
  isBusy: false
});

const removeItem = (state, item: Item) => ({
  ...state,
  items: remove(i => i.id, item, state.items),
  isBusy: false
});

const reducer = reducerWithInitialState(INITIAL_ITEM_STATE)
  // started
  .case(itemActions.loadItems.started, startAsync)
  .case(itemActions.loadItem.started, startAsync)
  .case(itemActions.addItem.started, startAsync)
  .case(itemActions.saveItem.started, startAsync)
  .case(itemActions.deleteItem.started, startAsync)
  // done
  .case(itemActions.loadItems.done, (state, items) => ({ ...state, items, isBusy: false }))
  .case(itemActions.loadItem.done, upsertItem)
  .case(itemActions.addItem.done, upsertItem)
  .case(itemActions.saveItem.done, upsertItem)
  .case(itemActions.deleteItem.done, removeItem)
  // failed
  .case(itemActions.loadItems.failed, handleAsyncError)
  .case(itemActions.loadItem.failed, handleAsyncError)
  .case(itemActions.addItem.failed, fns.handleError)
  .case(itemActions.deleteItem.failed, fns.handleError)
  ;

export function itemsReducer(state: ItemState = INITIAL_ITEM_STATE, action) {
  return reducer(state, action);
}

// ----------------------------------------------
// Effects

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
