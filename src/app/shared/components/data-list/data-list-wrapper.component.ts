// NOTE: This is purely a demonstration of how to wrap a non trivial component

import {
  Component,
  Input,
  Directive,
  ContentChild,
  TemplateRef,
} from '@angular/core';

@Directive({ selector: '[appDataListItemWrapper]' })
export class DataListItemWrapperDirective {}

@Component({
  selector: 'app-data-list-wrapper',
  template: `
    <app-data-list [items]="items">
      <ng-container *appDataListItem="let item">
        <ng-template
          *ngTemplateOutlet="itemWrappedTemplate; context: { $implicit: item }"
        ></ng-template>
      </ng-container>
    </app-data-list>
  `,
})
export class DataListWrapperComponent {
  @Input() items: any[];
  @ContentChild(DataListItemWrapperDirective, { read: TemplateRef })
  itemWrappedTemplate: TemplateRef<any>;
}
