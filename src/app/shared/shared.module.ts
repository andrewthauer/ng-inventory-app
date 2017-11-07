import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { TruncatePipe } from './truncate.pipe';

import {
  ButtonComponent,
  TitleComponent,
} from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [
    // components
    ButtonComponent,
    TitleComponent,
    // pipes
    TruncatePipe,
  ],
  exports: [
    // components
    ButtonComponent,
    TitleComponent,
    // pipes
    TruncatePipe,
    // modules
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class SharedModule { }
