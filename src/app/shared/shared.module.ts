import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {
  AppTemplateDirective,
  DelayDirective,
  HoverStyleDirective,
} from './directives';
import { EllipsePipe } from './pipes';

import {
  ButtonComponent,
  CardComponent,
  DataListComponent,
  DataListItemDirective,
  DataListWrapperComponent,
  DataListItemWrapperDirective,
  HeroUnitComponent,
  TitleComponent,
} from './components';

@NgModule({
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  declarations: [
    AppTemplateDirective,
    ButtonComponent,
    CardComponent,
    DataListComponent,
    DataListItemDirective,
    DataListWrapperComponent,
    DataListItemWrapperDirective,
    DelayDirective,
    EllipsePipe,
    HeroUnitComponent,
    HoverStyleDirective,
    TitleComponent,
  ],
  exports: [
    // modules
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    // components, directives, etc.
    ButtonComponent,
    CardComponent,
    DataListComponent,
    DataListItemDirective,
    DataListWrapperComponent,
    DataListItemWrapperDirective,
    DelayDirective,
    EllipsePipe,
    HeroUnitComponent,
    HoverStyleDirective,
    TitleComponent,
  ],
})
export class SharedModule {}
