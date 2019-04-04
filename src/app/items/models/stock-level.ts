import { Item } from './item.model';

export enum StockLevel {
  out,
  low,
  ok,
  overstock,
}

export function calcStockLevel(item: Item) {
  if (item.quantity === 0) {
    return StockLevel.out;
  } else if (item.quantity <= 2) {
    return StockLevel.low;
  } else if (item.quantity >= 100) {
    return StockLevel.overstock;
  } else {
    return StockLevel.ok;
  }
}
