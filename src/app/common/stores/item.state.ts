// NOTE: This is a simplified version of ngrx/store implementation

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { Item } from '../models';

export interface ItemsState {
  list: Item[];
  error: any;
  loading;
}

export const INITIAL_ITEMS_STATE: ItemsState = {
  list: [],
  error: null,
  loading: false
};

export interface ItemAction<T> extends Action {
  payload: T;
}

@Injectable()
export class ItemActions {
  static ADD_ITEM =             '[Collection] Add Item';
  static ADD_ITEM_SUCCESS =     '[Collection] Add Item Success';
  static ADD_ITEM_FAIL =        '[Collection] Add Item Fail';
  // static REMOVE_ITEM =          '[Collection] Remove Item';
  // static REMOVE_ITEM_SUCCESS =  '[Collection] Remove Item Success';
  // static REMOVE_ITEM_FAIL =     '[Collection] Remove Item Fail';
  static REQUEST_ITEMS = '[Item] Load Items';
  static LOAD_ITEMS_SUCCESS = '[Item] Load Items Success';
  static LOAD_ITEMS_FAILURE = '[Item] Load Items Failure';

  loadItems(): ItemAction<void> {
    return {
      type: ItemActions.REQUEST_ITEMS,
      payload: null
    };
  }

  loadItemsSuccess(items: Item[]): ItemAction<Item[]> {
    return {
      type: ItemActions.LOAD_ITEMS_SUCCESS,
      payload: items
    };
  }

  loadItemsFailure(error: string): ItemAction<string> {
    return {
      type: ItemActions.LOAD_ITEMS_FAILURE,
      payload: error
    };
  }
}

export class AddItemAction implements Action {
  static TYPE = '[Collection] Add Item';
  type = AddItemAction.TYPE;
  constructor(public payload: Item) { }
  static of(payload: Item) { return new AddItemAction(payload); }
}

export class AddItemSuccessAction {
  static TYPE = '[Collection] Add Item Success';
  type = AddItemSuccessAction.TYPE;
  constructor(public payload: Item) { }
  static of(payload: Item) { return new AddItemSuccessAction(payload); }
}

export class AddItemFailureAction {
  static TYPE = '[Collection] Add Item Success';
  type = AddItemFailureAction.TYPE;
  constructor(public payload: string) { }
  static of(payload: string) { return new AddItemFailureAction(payload); }
}

export function itemsReducer(state: ItemsState = INITIAL_ITEMS_STATE, action) {
  switch (action.type) {
    case ItemActions.LOAD_ITEMS_SUCCESS: {
      return { ...state, list: action.payload };
    }
    case ItemActions.LOAD_ITEMS_FAILURE: {
      return { ...state, error: action.payload };
    }
    default: {
      return state;
    }
  }
}
