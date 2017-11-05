import * as R from 'ramda';

export function upsert<T>(keySelector: (a: T) => any, item: T, list: Array<T>): Array<T> {
  const items = [...list.map(i => keySelector(i) === keySelector(item) ? item : i)];
  const newItems = !R.any(i => keySelector(i) === keySelector(item), items) ? [...items, item] : items;
  return newItems;
}
