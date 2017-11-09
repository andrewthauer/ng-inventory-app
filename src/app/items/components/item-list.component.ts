import { Component, OnInit, Input } from '@angular/core';
import { ifElse, identity } from 'ramda';

import { Store } from '@ngrx/store';
import { AppState } from '../../store';

import { ModalService } from '../../core/modal.service';
import { Item, ItemService, StockLevel, calcStockLevel, ItemFilters } from '../shared';
import { itemActions } from '../store';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styles: [`
    .low-stock { color: red; }
  `],
})
export class ItemListComponent implements OnInit {
  StockLevel = StockLevel;

  @Input() searchText: string;
  public model;

  constructor(
    private store: Store<AppState>,
    private itemService: ItemService,
    private modal: ModalService
  ) { }

  ngOnInit() {
    this.searchText = '';
    this.model = this.itemService.loadAndSelectAll();
  }

  addItem() {
    this.itemService.addItem();
  }

  deleteItem(item: Item) {
    this.modal.confirm('Are you sure?')
      .subscribe(ifElse(identity,
        () => this.itemService.removeItem(item),
        () => false
      ));
  }

  stockLevel(item: Item) {
    return calcStockLevel(item);
  }

  onFilterChanged(searchText) {
    const filters: ItemFilters = { searchText };
    this.store.dispatch(itemActions.setFilters(filters));
  }

  quantityChanged(item) {
    this.itemService.saveItem(item);
  }
}
