import { Component, OnInit, Input, Output, ContentChild, TemplateRef } from '@angular/core';
import { DataListItemDirective } from './data-list-item.directive';

@Component({
  selector: 'app-data-list',
  template: `
    <ng-container *ngFor="let item of items">
      <ng-container *ngTemplateOutlet="itemTemplate; context: { $implicit: item }"></ng-container>
    </ng-container>
  `
})
export class DataListComponent implements OnInit {
  @Input() items: any[];
  @ContentChild(DataListItemDirective, { read: TemplateRef }) itemTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() { }
}
