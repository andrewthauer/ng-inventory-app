import { Routes } from '@angular/router';
import { ItemsComponent, } from './items.component';
import { ItemListComponent } from './item-list.component';
import { ItemDetailComponent } from './item-detail.component';

export const routes: Routes = [
  {
    path: 'items',
    component: ItemsComponent,
    children: [
      { path: '', component: ItemListComponent },
      { path: ':id', component: ItemDetailComponent }
    ]
  }
];
