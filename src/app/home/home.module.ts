import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { routes } from './home.routing';

import { HomeComponent } from './home.component';
import { HeroUnitComponent } from './hero-unit.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    HomeComponent,
    HeroUnitComponent,
  ],
  exports: [
    HomeComponent,
    HeroUnitComponent,
  ]
})
export class HomeModule { }
