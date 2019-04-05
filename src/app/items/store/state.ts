import { Item } from '../models';

export const itemStoreFeatureName = 'items';

export interface ItemState {
  entities: Item[];
  error: Error;
  isBusy: boolean;
  selectedItemId: number;
}

export const itemInitialState: ItemState = {
  entities: [],
  error: null,
  isBusy: false,
  selectedItemId: null,
};
