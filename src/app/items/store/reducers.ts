import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { upsert, remove } from '../../utils/fp';
import { Item } from '../models';
import { ItemsState, itemsInitialState } from './state';
import { itemActions } from './actions';

const handleError = (state: any, err: Error | any) => ({
  ...state,
  error: err,
});
const handleAsyncError = (state, err) => ({
  ...handleError(state, err),
  isBusy: false,
});
const startAsync = (state, payload: any) => ({ ...state, isBusy: true });
const selectItemId = (state, id: number) => {
  return { ...state, selectedItemId: id };
};

const upsertItem = (state: ItemsState, item: Item): ItemsState => ({
  ...state,
  entities: upsert(i => i.id, item, state.entities),
  isBusy: false,
});

const removeItem = (state: ItemsState, item: Item): ItemsState => ({
  ...state,
  entities: remove(i => i.id, item, state.entities),
  isBusy: false,
});

export const reducer = reducerWithInitialState(itemsInitialState)
  .case(itemActions.setFilters, (state, text) => ({ ...state, filter: text }))
  .case(itemActions.selectOne, selectItemId)
  .cases(
    [
      itemActions.loadAll.started,
      itemActions.loadOne.started,
      itemActions.addOne.started,
      itemActions.saveOne.started,
      itemActions.removeOne.started,
    ],
    startAsync,
  )
  .case(itemActions.loadAll.done, (state, payload) => ({
    ...state,
    entities: payload.result,
    isBusy: false,
  }))
  .cases(
    [
      itemActions.loadOne.done,
      itemActions.addOne.done,
      itemActions.saveOne.done,
    ],
    (state, payload) => upsertItem(state, payload.result),
  )
  .case(itemActions.removeOne.done, (state, payload) =>
    removeItem(state, payload.result),
  )
  .cases(
    [
      itemActions.loadAll.failed,
      itemActions.loadOne.failed,
      itemActions.addOne.failed,
      itemActions.saveOne.failed,
      itemActions.removeOne.failed,
    ],
    handleAsyncError,
  );

export function itemsReducer(state: ItemsState = itemsInitialState, action) {
  return reducer(state, action);
}
