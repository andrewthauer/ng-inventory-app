import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { routing } from './app.routes';

import { AppCommonModule } from './common';
import { rootReducer, allEffects } from './common/state';
import { ItemPersistenceService, ItemService } from './common/services';
import { HomeComponent } from './home';

import {
  ItemsComponent,
  ItemListComponent,
  ItemDetailsComponent,
  QuantityEditorComponent,
} from './items';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemsComponent,
    ItemListComponent,
    ItemDetailsComponent,
    QuantityEditorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(rootReducer),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot(allEffects),
    HttpClientModule,
    routing,
    AppCommonModule,
  ],
  providers: [
    ItemPersistenceService,
    ItemService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
