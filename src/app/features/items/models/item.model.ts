export interface Item {
  id?: number;
  code: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  quantity?: number;
}

export const itemKeySelector = (item: Item) => item.id;
