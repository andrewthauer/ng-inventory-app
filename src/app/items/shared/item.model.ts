export interface Item {
  id?: number;
  name?: string;
  description?: string;
  imageUrl?: string;
  quantity?: number;
  minimumQuantity?: number;
}

export const itemKeySelector = (item: Item) => item.id;
