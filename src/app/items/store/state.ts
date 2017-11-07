import { Item } from '../shared';

export interface ItemState {
  items: Item[];
  error: Error;
  isBusy: boolean;
}

export const itemsInitialState: ItemState = {
  items: [],
  error: null,
  isBusy: false
};
