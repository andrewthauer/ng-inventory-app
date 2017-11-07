import { createSelector } from '@ngrx/store';
import { Item } from '../shared';
import { ItemState } from './state';

export const itemSelector = (state: ItemState, id: number) => state.items.filter(item => item.id === id);
