import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreModule } from './core';
import { SharedModule } from './shared';
import { HomeModule } from './home';
import { ItemsModule } from './items';
import { routes } from './app.routing';
import { rootReducer, allEffects } from './store';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    ItemsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(rootReducer),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot(allEffects),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
