import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { HomeComponent } from './home.component';
import { routes } from './home.routes';

const routingModule = RouterModule.forChild(routes);

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    SharedModule,
    routingModule,
  ],
  exports: [
    HomeComponent,
  ],
  providers: []
})
export class HomeModule { }
