import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { HoverStyleDirective } from './hover-style.directive';
import { DelayDirective } from './delay.directive';
import { EllipsePipe } from './ellipse.pipe';

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
    // directives
    DelayDirective,
    HoverStyleDirective,
    // pipes
    EllipsePipe,
  ],
  exports: [
    // components
    ButtonComponent,
    TitleComponent,
    // directives
    DelayDirective,
    HoverStyleDirective,
    // pipes
    EllipsePipe,
    // modules
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class SharedModule { }
