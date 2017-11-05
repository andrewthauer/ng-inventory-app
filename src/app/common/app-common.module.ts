import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  HeaderComponent,
} from './layout';

import {
  ButtonComponent,
  HeroUnitComponent,
  TitleComponent,
} from './components';

@NgModule({
  declarations: [
    ButtonComponent,
    HeaderComponent,
    HeroUnitComponent,
    TitleComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonComponent,
    HeaderComponent,
    HeroUnitComponent,
    TitleComponent,
  ],
  providers: []
})
export class AppCommonModule { }
