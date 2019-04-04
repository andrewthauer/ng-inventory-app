import { actionCreatorFactory } from 'typescript-fsa';
import { Item, ItemFilters } from '../models';

const actionCreator = actionCreatorFactory();

export const itemActions = {
  setFilters: actionCreator<ItemFilters>('SET_ITEMS_FILTER'),
  selectOne: actionCreator<number>('SELECT_ONE_ITEM'),
  loadAll: actionCreator.async<ItemFilters, Item[], Error>('LOAD_ALL_ITEMS'),
  loadOne: actionCreator.async<number, Item, Error>('LOAD_ONE_ITEM'),
  addOne: actionCreator.async<Item, Item, Error>('ADD_ONE_ITEM'),
  saveOne: actionCreator.async<Item, Item, Error>('SAVE_ONE_ITEM'),
  removeOne: actionCreator.async<Item, Item, Error>('DELETE_ONE_ITEM'),
};
