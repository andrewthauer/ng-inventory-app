import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedModule } from './shared';
import { HomeModule } from './features/home';
import { ItemsModule } from './features/items';
import { AppComponent } from './app.component';

import { rootReducer, allEffects } from './store';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
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
