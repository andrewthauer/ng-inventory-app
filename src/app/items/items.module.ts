import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import { routes } from './items.routing';
import { itemsStoreFeatureName, itemsReducer, ItemsEffects } from './store';

import { ItemPersistenceService } from './services';

import {
  ItemFormComponent,
  ItemFilterComponent,
  QuantityEditorComponent,
} from './components';

import {
  ItemsComponent,
  ItemListComponent,
  ItemDetailComponent,
} from './containers';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(itemsStoreFeatureName, itemsReducer),
    EffectsModule.forFeature([ItemsEffects]),
  ],
  declarations: [
    ItemsComponent,
    ItemFormComponent,
    ItemFilterComponent,
    ItemListComponent,
    ItemDetailComponent,
    QuantityEditorComponent,
  ],
  providers: [ItemPersistenceService],
})
export class ItemsModule {}
