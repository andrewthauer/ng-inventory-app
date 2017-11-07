import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { HomeComponent } from './home.component';
import { routes } from './home.routing';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    HomeComponent,
  ],
  providers: []
})
export class HomeModule { }
