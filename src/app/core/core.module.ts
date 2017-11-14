import { NgModule, ModuleWithProviders, Optional, SkipSelf, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-modialog';
import { JSNativeModalModule } from 'ngx-modialog/plugins/js-native';

import { throwIfAlreadyLoaded } from './shared';

import {
  Logger,
  LoggerToken,
  LoggerLike,
  ModalService,
  ToastService,
} from './services';

import {
  HeaderComponent
} from './components';

import {
  NotFoundComponent
} from './containers';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    JSNativeModalModule
  ],
  declarations: [
    HeaderComponent,
    NotFoundComponent,
  ],
  providers: [
    Logger,
    ModalService,
    ToastService,
  ],
  exports: [
    HeaderComponent,
    NotFoundComponent,
  ],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
    @Optional() @Inject(LoggerToken) private logger: LoggerLike
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');

    if (this.logger) {
      this.logger.info('Application Started ...');
    }
  }

  static forRoot(logger?: LoggerLike): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: LoggerToken, useValue: logger }
      ]
    };
  }
}
