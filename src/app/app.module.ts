import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { environment } from '../environments/environment';
import { AppConfigToken, buildAppConfig } from './app.config';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from 'app/store';
import { AppComponent } from './app.component';
import { CoreModule, LoggerToken } from './core';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    CoreModule,
    AppRoutingModule,
    AppStoreModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    { provide: LoggerToken, useValue: console },
    { provide: AppConfigToken, useValue: buildAppConfig() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {
    const platform = isPlatformBrowser(platformId) ? 'on the server' : 'in the browser';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
