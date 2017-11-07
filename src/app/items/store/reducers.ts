import { reducerWithInitialState, isType } from '../../../lib/ts-redux-fsa';
import { upsert, remove } from '../../utils/fp';
import { Item } from '../shared';
import { ItemState, itemsInitialState } from './state';
import { itemActions } from './actions';

const handleError = (state: any, err: Error | any) => ({ ...state, error: err });
const handleAsyncError = (state, err) => ({ ...handleError(state, err), isBusy: false });
const startAsync = (state, payload: any) => ({ ...state, isBusy: true });

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

export const itemsReducer = reducerWithInitialState(itemsInitialState)
  // started
  .cases([
    itemActions.loadItems.started,
    itemActions.loadItem.started,
    itemActions.addItem.started,
    itemActions.saveItem.started,
    itemActions.deleteItem.started,
  ], startAsync)
  // done
  .case(itemActions.loadItems.done, (state, items) => ({ ...state, items, isBusy: false }))
  .cases([
    itemActions.loadItem.done,
    itemActions.addItem.done,
    itemActions.saveItem.done,
  ], upsertItem)
  .case(itemActions.deleteItem.done, removeItem)
  // failed
  .cases([
    itemActions.loadItems.failed,
    itemActions.loadItem.failed,
    itemActions.addItem.failed,
    itemActions.deleteItem.failed,
    ], handleAsyncError)
  ;
