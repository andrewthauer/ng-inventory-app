import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './core/containers/not-found.component';
import { HomeModule } from './home';

const featureRoutes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'items', loadChildren: './items/items.module#ItemsModule' },
  { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  // },
  // {
  //   path: 'items',
  //   loadChildren: () => import('./items/items.module').then(m => m.ItemsModule),
  // },
  // {
  //   path: 'lazy',
  //   loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule),
  // },
];

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  ...featureRoutes,
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes), HomeModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
