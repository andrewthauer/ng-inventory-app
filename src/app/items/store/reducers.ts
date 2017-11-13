import { reducerWithInitialState, isType, FsaAction } from '../../../lib/ts-redux-fsa';
import { upsert, remove } from '../../utils/fp';
import { Item } from '../models';
import { ItemsState, itemsInitialState } from './state';
import { itemActions } from './actions';

const handleError = (state: any, err: Error | any) => ({ ...state, error: err });
const handleAsyncError = (state, err) => ({ ...handleError(state, err), isBusy: false });
const startAsync = (state, payload: any) => ({ ...state, isBusy: true });
const selectItemId = (state, id: number) => {
  return { ...state, selectedItemId: id };
};

const upsertItem = (state: ItemsState, item: Item): ItemsState => ({
  ...state,
  entities: upsert(i => i.id, item, state.entities),
  isBusy: false
});

const removeItem = (state: ItemsState, item: Item): ItemsState => ({
  ...state,
  entities: remove(i => i.id, item, state.entities),
  isBusy: false
});

export const itemsReducer = reducerWithInitialState(itemsInitialState)
  .case(itemActions.setFilters, (state, text) => ({ ...state, filter: text }))
  .case(itemActions.selectOne, selectItemId)
  .cases([
    itemActions.loadAll.started,
    itemActions.loadOne.started,
    itemActions.addOne.started,
    itemActions.saveOne.started,
    itemActions.removeOne.started,
  ], startAsync)
  .case(itemActions.loadAll.done, (state, entities) => ({ ...state, entities, isBusy: false }))
  .cases([
    itemActions.loadOne.done,
    itemActions.addOne.done,
    itemActions.saveOne.done,
  ], upsertItem)
  .case(itemActions.removeOne.done, removeItem)
  .cases([
    itemActions.loadAll.failed,
    itemActions.loadOne.failed,
    itemActions.addOne.failed,
    itemActions.saveOne.failed,
    itemActions.removeOne.failed,
    ], handleAsyncError)
  ;
