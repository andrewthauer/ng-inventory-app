import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { routes } from './lazy.routing';
import { LazyPageComponent } from './lazy-page.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [LazyPageComponent],
})
export class LazyModule {}
