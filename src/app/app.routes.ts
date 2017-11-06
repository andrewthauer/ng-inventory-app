import { RouterModule, Routes } from '@angular/router';

import { ItemsComponent, ItemListComponent, ItemDetailComponent } from './items';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'items', loadChildren: './items/items.module#ItemsModule' },
];
