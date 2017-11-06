import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { SharedModule } from './shared';
import { HomeModule } from './home';
import { ItemsModule } from './items';

import { routes } from './app.routes';
import { rootReducer, allEffects } from './shared/state';
import { ItemPersistenceService, ItemService } from './shared/services';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot(allEffects),
    HomeModule,
    HttpClientModule,
    ItemsModule,
    RouterModule.forRoot(routes),
    SharedModule,
    StoreModule.forRoot(rootReducer),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [
    ItemPersistenceService,
    ItemService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
