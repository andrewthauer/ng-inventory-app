import * as R from 'ramda';

export function upsert<T>(keySelector: (a: T) => any, item: T, list: Array<T>): Array<T> {
  const items = [...list.map(i => keySelector(i) === keySelector(item) ? item : i)];
  const result = !R.any(i => keySelector(i) === keySelector(item), items) ? [...items, item] : items;
  return result;
}

export function remove<T>(keySelector: (a: T) => any, item: T, list: Array<T>): Array<T> {
  const result = [...list.filter(i => keySelector(i) !== keySelector(item))];
  return result;
}
