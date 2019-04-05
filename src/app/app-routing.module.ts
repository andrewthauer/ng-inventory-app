import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './shell';
import { HomeModule } from './home';
import { featureRoutes } from './app-routes';

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
