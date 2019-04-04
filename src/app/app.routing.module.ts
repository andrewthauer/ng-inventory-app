import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './core/containers/not-found.component';

import { HomeModule } from './home';
import { ItemsModule } from './items';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'items', loadChildren: './items/items.module#ItemsModule' },
  { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [HomeModule, ItemsModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
