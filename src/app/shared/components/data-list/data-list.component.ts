import {
  Component,
  OnInit,
  Input,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { DataListItemDirective } from './data-list-item.directive';

/**
 * A data list repeater component.
 *
 * @export
 * @class DataListComponent
 * @implements {OnInit}
 * @example
 *  <app-data-list [items]="oneTwoThree">
 *    <ng-template appDataListItem let-item>Number: {{ item.text }}</ng-template>
 *  </app-data-list>
 */
@Component({
  selector: 'app-data-list',
  template: `
    <ng-container *ngFor="let item of items">
      <ng-container
        *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"
      ></ng-container>
    </ng-container>
  `,
})
export class DataListComponent implements OnInit {
  @Input() items: any[];
  @ContentChild(DataListItemDirective, { read: TemplateRef })
  itemTemplate: TemplateRef<any>;

  constructor() {}

  ngOnInit() {}
}
