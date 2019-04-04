import { any } from 'ramda';

/**
 * Insert or updates an item in an list based on the key selector comparer
 *
 * @export
 * @template T
 * @param {(i: T) => any} keySelector A function that returns the unique key for each item
 * @param {T} item The item to search for
 * @param {Array<T>} list The list of items
 * @returns {Array<T>} An new list with the new or updated item
 */
export function upsert<T>(
  keySelector: (i: T) => any,
  item: T,
  list: Array<T>,
): Array<T> {
  const items = [
    ...list.map(i => (keySelector(i) === keySelector(item) ? item : i)),
  ];
  const result = !any(i => keySelector(i) === keySelector(item), items)
    ? [...items, item]
    : items;
  return result;
}

/**
 * Removes an item in a list based on the key selector comparer
 *
 * @export
 * @template T
 * @param {(i: T) => any} keySelector A function that returns the unique key for each item
 * @param {T} item The item to search for
 * @param {Array<T>} list The list of items
 * @returns {Array<T>} An new list without the item (if found)
 */
export function remove<T>(
  keySelector: (i: T) => any,
  item: T,
  list: Array<T>,
): Array<T> {
  const result = [...list.filter(i => keySelector(i) !== keySelector(item))];
  return result;
}
