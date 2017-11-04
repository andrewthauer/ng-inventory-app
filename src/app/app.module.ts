import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { routing } from './app.routes';

import {
  appReducer,
  ItemEffects,
} from './common/store';

import {
  ItemPersistenceService,
  ItemService,
} from './common/services';

import {
  HeaderComponent,
  HeroUnitComponent,
} from './common/components';

import {
  ItemsComponent,
  ItemListComponent,
  ItemDetailsComponent,
  QuantityEditorComponent,
} from './items';

import { HomeComponent } from './home';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroUnitComponent,
    HomeComponent,
    ItemsComponent,
    ItemListComponent,
    ItemDetailsComponent,
    QuantityEditorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot([ItemEffects]),
    HttpClientModule,
    routing,
  ],
  providers: [
    ItemPersistenceService,
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
