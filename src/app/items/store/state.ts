import { Item } from '../shared';

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
