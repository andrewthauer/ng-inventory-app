import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Item } from '../shared/models';
import { ItemService } from '../shared/services';

@Component({
  selector: 'app-item-form',
  templateUrl: 'item-form.component.html'
})
export class ItemFormComponent implements OnInit, OnDestroy {
  @Input() model: Item;
  @Output() changed = new EventEmitter<Item>();
  @Output() submitted = new EventEmitter<Item>();
  @Output() cancelled = new EventEmitter();

  constructor(
  ) { }

  ngOnInit() { }

  ngOnDestroy() { }

  submit(form: NgForm) {
    const item = form.value;
    this.submitted.emit(item);
  }

  cancel() {
    this.cancelled.emit();
  }
}
