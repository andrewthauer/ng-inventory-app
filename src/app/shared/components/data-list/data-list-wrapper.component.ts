// NOTE: This is purely a demonstration of how to wrap a non trivial component

import { Component, Input, Output, Directive, ContentChild, TemplateRef } from '@angular/core';
import { DataListItemDirective } from './data-list-item.directive';

@Directive({ selector: '[appDataListItemWrapper]' })
export class DataListItemWrapperDirective {
  constructor() { }
}

@Component({
  selector: 'app-data-list-wrapper',
  template: `
    <app-data-list [items]="items">
      <div *appDataListItem="let item">
        <ng-template *ngTemplateOutlet="itemWrappedTemplate; context: { $implicit: item }"></ng-template>
      </div>
    </app-data-list>
  `
})
export class DataListWrapperComponent {
  @Input() items: any[];
  @ContentChild(DataListItemWrapperDirective, { read: TemplateRef }) itemWrappedTemplate: TemplateRef<any>;
}
