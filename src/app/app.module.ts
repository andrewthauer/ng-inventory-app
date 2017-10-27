import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { routing } from './app.routes';

import { itemsReducer, ItemActions } from './common/stores';

import {
  HttpService,
  ItemService,
  ItemEffects
} from './common/services';

import {
  HeaderComponent,
  HeroComponent,
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
    HeroComponent,
    HomeComponent,
    ItemsComponent,
    ItemListComponent,
    ItemDetailsComponent,
    QuantityEditorComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ items: itemsReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot([ItemEffects]),
    HttpClientModule,
    routing,
  ],
  providers: [
    HttpService,
    ItemService,
    ItemActions,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
