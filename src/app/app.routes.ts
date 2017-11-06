import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './features/home/home.module#HomeModule' },
  { path: 'items', loadChildren: './features/items/items.module#ItemsModule' },
];
