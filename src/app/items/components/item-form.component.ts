import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Item } from '../models';

@Component({
  selector: 'app-item-form',
  templateUrl: 'item-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemFormComponent implements OnInit, OnDestroy {
  @Input() model: Item;
  @Output() changed = new EventEmitter<Item>();
  @Output() onSubmit = new EventEmitter<Item>();
  @Output() onCancel = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}

  submit(form: NgForm) {
    const item = form.value;
    this.onSubmit.emit(item);
  }

  cancel() {
    this.onCancel.emit();
  }
}
