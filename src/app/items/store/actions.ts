import { actionCreatorFactory } from '../../../lib/ts-redux-fsa';
import { Item } from '../shared';

const actionCreator = actionCreatorFactory();

export interface LoadItemsOptions {
  searchText?: string;
}

export const itemActions = {
  setItemsFilter: actionCreator<string>('SET_ITEMS_FILTER'),
  selectItem: actionCreator<number>('SELECT_ITEM'),
  loadItems: actionCreator.async<LoadItemsOptions | string | void, Item[], Error>('LOAD_ITEMS'),
  loadItem: actionCreator.async<number, Item, Error>('LOAD_ITEM'),
  addItem: actionCreator.async<Item, Item, Error>('ADD_ITEM'),
  saveItem: actionCreator.async<Item, Item, Error>('SAVE_ITEM'),
  deleteItem: actionCreator.async<Item, Item, Error>('DELETE_ITEM')
};
