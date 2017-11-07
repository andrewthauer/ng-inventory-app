import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {
  ButtonComponent,
  HeroUnitComponent,
  TitleComponent,
} from './components';

@NgModule({
  declarations: [
    ButtonComponent,
    HeroUnitComponent,
    TitleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    // components
    ButtonComponent,
    HeroUnitComponent,
    TitleComponent,
    // modules
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: []
})
export class SharedModule { }
