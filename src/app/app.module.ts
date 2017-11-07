import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppConfigToken, buildAppConfig } from './app.config';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './store';
import { AppComponent } from './app.component';

import { CoreModule } from './core';
import { SharedModule } from './shared';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    AppStoreModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    { provide: AppConfigToken, useValue: buildAppConfig() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
