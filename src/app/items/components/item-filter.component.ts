import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-filter',
  template: `
    <div class="tr">
      <input
        #searchField
        type="text"
        class="pa1"
        [(ngModel)]="searchText"
        placeholder="Search ..."
      />
    </div>
  `,
})
export class ItemFilterComponent implements OnInit {
  @Output() valueChanged = new EventEmitter<string>();
  private _searchText: string;

  constructor() {}

  get searchText() {
    return this._searchText;
  }

  @Input()
  set searchText(value) {
    if (this._searchText !== value) {
      this._searchText = value;
      this.valueChanged.emit(value);
    }
  }

  ngOnInit() {}
}
