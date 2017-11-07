import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { CoreModule } from './core';
import { StoreModule } from './store';
import { SharedModule } from './shared';
import { HomeModule } from './home';
import { ItemsModule } from './items';
import { routes } from './app.routing';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule.forRoot(routes),
    StoreModule,
    SharedModule,
    HomeModule,
    ItemsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
