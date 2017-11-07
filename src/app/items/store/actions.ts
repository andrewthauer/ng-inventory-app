import { actionCreatorFactory } from '../../../lib/ts-redux-fsa';
import { Item } from '../shared';

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
