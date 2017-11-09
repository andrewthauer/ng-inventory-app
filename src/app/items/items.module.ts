import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { routes } from './items.routing';

import {
  ItemPersistenceService,
  ItemService,
} from './shared';

import {
  ItemsComponent,
  ItemFormComponent,
  ItemFilterComponent,
  ItemListComponent,
  ItemDetailComponent,
  QuantityEditorComponent
} from './components';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ItemsComponent,
    ItemFormComponent,
    ItemFilterComponent,
    ItemListComponent,
    ItemDetailComponent,
    QuantityEditorComponent,
  ],
  providers: [
    ItemPersistenceService,
    ItemService,
  ],
  exports: [
    ItemsComponent,
    ItemFormComponent,
    ItemFilterComponent,
    ItemListComponent,
    ItemDetailComponent,
    QuantityEditorComponent,
  ]
})
export class ItemsModule { }
