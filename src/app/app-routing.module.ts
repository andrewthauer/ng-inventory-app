import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeModule } from './home';
import { ItemsModule } from './items';

import { NotFoundComponent } from './core/not-found.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'items', loadChildren: './items/items.module#ItemsModule' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    HomeModule,
    ItemsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
