import { Item } from './item.model';
import { StockLevel, calcStockLevel } from './stock-level';

describe('Stock Level', () => {
  const itemTemplate: Item = { id: 1, name: 'my item' };

  describe('calcStockLevel', () => {
    it('should be out of stock', () => {
      const item = Object.assign(itemTemplate, { quantity: 0 });
      expect(calcStockLevel(item)).toBe(StockLevel.out);
    });

    it('should be low on stock', () => {
      const item = Object.assign(itemTemplate, { quantity: 1 });
      expect(calcStockLevel(item)).toBe(StockLevel.low);
    });

    it('should be over stock', () => {
      const item = Object.assign(itemTemplate, { quantity: 100 });
      expect(calcStockLevel(item)).toBe(StockLevel.overstock);
    });

    it('should be in good standing', () => {
      const item = Object.assign(itemTemplate, { quantity: 3 });
      expect(calcStockLevel(item)).toBe(StockLevel.ok);
    });
  });
});
