import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { routes } from './items.routes';

import { ItemsComponent } from './items.component';
import { ItemFormComponent } from './item-form.component';
import { ItemListComponent } from './item-list.component';
import { ItemDetailComponent } from './item-detail.component';
import { QuantityEditorComponent } from './quantity-editor.component';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemFormComponent,
    ItemListComponent,
    ItemDetailComponent,
    QuantityEditorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [
    ItemsComponent,
    ItemFormComponent,
    ItemListComponent,
    ItemDetailComponent,
    QuantityEditorComponent,
  ],
  providers: []
})
export class ItemsModule { }
