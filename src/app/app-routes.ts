import { Routes } from '@angular/router';

export const featureRoutes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'items', loadChildren: './items/items.module#ItemsModule' },
  { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' },
];
