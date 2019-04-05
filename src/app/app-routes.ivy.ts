import { Routes } from '@angular/router';

import { HomeModule } from './home';

export const featureRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => HomeModule,
  },
  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then(m => m.ItemsModule),
  },
  {
    path: 'lazy',
    loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule),
  },
];
