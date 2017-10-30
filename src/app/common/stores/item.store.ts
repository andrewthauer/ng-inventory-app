import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, createSelector } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

import { appError } from '../utils';
import { actionCreatorFactory, isType, FsaAction, reducerWithInitialState } from '../../lib/ngrx-fsa';

import { Item } from '../models';
import { ItemPersistenceService } from '../services/item-persistence.service';

// ----------------------------------------------
// State

export interface ItemsState {
  items: Item[];
  error: Error;
  isLoading: boolean;
  selectedItemId: number;
}

export const INITIAL_ITEMS_STATE: ItemsState = {
  items: [],
  error: null,
  isLoading: false,
  selectedItemId: null
};

// ----------------------------------------------
// Actions

const actionCreator = actionCreatorFactory();

export const itemActions = {
  loadItems: actionCreator.async<void, Item[], Error>('LOAD_ITEMS'),
  getItem: actionCreator.async<number, Item, Error>('GET_ITEM'),
  addItem: actionCreator.async<Item, Item, Error>('ADD_ITEM'),
  deleteItem: actionCreator.async<Item, boolean, Error>('DELETE_ITEM'),
  incrementQuantity: actionCreator.async<Item, Item, Error>('INCREMENT_QUANTITY'),
  decrementQuantity: actionCreator.async<Item, Item, Error>('DECREMENT_QUANTITY')
};

// ----------------------------------------------
// Selectors

export const itemSelector = (state: ItemsState, id: number) => state.items.filter(item => item.id === id);

// ----------------------------------------------
// Reducers

const handleError = (state: ItemsState, err: Error | any): ItemsState => ({ ...state, error: err });
const startedLoading = (state: ItemsState, err: Error | any): ItemsState => ({ ...state, isLoading: true });
const finishedLoading = (state: ItemsState, err: Error | any): ItemsState => ({ ...state, isLoading: false });

const reducer = reducerWithInitialState(INITIAL_ITEMS_STATE)
  .case(itemActions.loadItems.done, (state, items) => ({ ...state, items: items }))
  // Error Handlers (make array helper)
  .case(itemActions.loadItems.failed, handleError)
  .case(itemActions.addItem.failed, handleError)
  .case(itemActions.deleteItem.failed, handleError)
  ;

export function itemsReducer(state: ItemsState = INITIAL_ITEMS_STATE, action) {
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
    .ofType(itemActions.loadItems.started.type)
    .switchMap(item => this.persistence.getItems())
    .map(items => itemActions.loadItems.done(items))
    .catch(err => of(itemActions.addItem.failed(appError(err))));

  @Effect()
  addItem$ = this.actions$
    .ofType<FsaAction<Item>>(itemActions.addItem.started.type)
    .map(action => action.payload)
    .switchMap(item => this.persistence.saveItem(item))
    .map(item => itemActions.addItem.done(item))
    .map(item => itemActions.loadItems.started()) // TODO: Make proper reducer
    .catch(err => of(itemActions.addItem.failed(appError(err))));

  @Effect()
    deleteItem$ = this.actions$
      .ofType<FsaAction<Item>>(itemActions.deleteItem.started.type)
      .map(action => action.payload)
      .switchMap(item => this.persistence.deleteItem(item))
      .map(item => itemActions.deleteItem.done(true))
      .map(item => itemActions.loadItems.started()) // TODO: Make proper reducer
      .catch(err => of(itemActions.addItem.failed(appError(err))));
}
