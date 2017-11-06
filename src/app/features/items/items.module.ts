import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { routes } from './items.routes';

import {
  ItemPersistenceService,
  ItemService,
} from './services';

import {
  ItemsComponent,
  ItemFormComponent,
  ItemListComponent,
  ItemDetailComponent,
  QuantityEditorComponent
} from './components';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemFormComponent,
    ItemListComponent,
    ItemDetailComponent,
    QuantityEditorComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ItemsComponent,
    ItemFormComponent,
    ItemListComponent,
    ItemDetailComponent,
    QuantityEditorComponent,
  ],
  providers: [
    ItemPersistenceService,
    ItemService,
  ]
})
export class ItemsModule { }
