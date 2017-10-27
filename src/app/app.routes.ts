import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home';
import { ItemsComponent, ItemDetailsComponent } from './items';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'items/:id', component: ItemDetailsComponent },
];

export const routing = RouterModule.forRoot(routes);
