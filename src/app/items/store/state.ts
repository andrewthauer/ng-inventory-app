import { Item } from '../shared';

export interface ItemState {
  items: Item[];
  error: Error;
  isBusy: boolean;
  selectedItemId: number;
}

export const itemsInitialState: ItemState = {
  items: [],
  error: null,
  isBusy: false,
  selectedItemId: null
};
