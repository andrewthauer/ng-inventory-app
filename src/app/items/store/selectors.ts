import { createSelector } from '@ngrx/store';
import { Item } from '../shared';
import { ItemState } from './state';

export const itemsSelector = (state: ItemState) => state.items;

export const itemByIdSelector = (state: ItemState, id: number) => state.items.filter(item => item.id === id);
