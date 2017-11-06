import { reducerWithInitialState, isType } from '../../../lib/ngrx-fsa';
import { handleError } from '../../../store/utils';
import { appError, upsert, remove } from '../../../utils';

import { Item } from '../models';
import { ItemState, INITIAL_ITEM_STATE } from './state';
import { itemActions } from './actions';

const handleAsyncError = (state, err) => ({ ...handleError(state, err), isBusy: false });

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
  .case(itemActions.addItem.failed, handleError)
  .case(itemActions.deleteItem.failed, handleError)
  ;

export function itemsReducer(state: ItemState = INITIAL_ITEM_STATE, action) {
  return reducer(state, action);
}
