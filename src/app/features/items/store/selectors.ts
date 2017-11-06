import { createSelector } from '@ngrx/store';
// import * as R from 'ramda';

import { Item } from '../models';
import { ItemState } from './state';

export const itemSelector = (state: ItemState, id: number) => state.items.filter(item => item.id === id);
