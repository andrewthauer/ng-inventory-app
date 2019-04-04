import { Item } from '../models';

export const itemsStoreFeatureName = 'items';

export interface ItemsState {
  entities: Item[];
  error: Error;
  isBusy: boolean;
  selectedItemId: number;
}

export const itemsInitialState: ItemsState = {
  entities: [],
  error: null,
  isBusy: false,
  selectedItemId: null,
};
