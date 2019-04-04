import { Routes } from '@angular/router';

import {
  ItemsComponent,
  ItemListComponent,
  ItemDetailComponent,
} from './containers';

export const routes: Routes = [
  {
    path: 'items',
    component: ItemsComponent,
    children: [
      { path: '', component: ItemListComponent },
      { path: ':id', component: ItemDetailComponent },
    ],
  },
];
