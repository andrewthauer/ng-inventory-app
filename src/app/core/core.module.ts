import { NgModule, ModuleWithProviders, Optional, SkipSelf, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Logger, LoggerToken, LoggerLike } from './logger';
import { HeaderComponent } from './header.component';
import { NotFoundComponent } from './not-found.component';

import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    HeaderComponent,
    NotFoundComponent,
  ],
  providers: [
    Logger
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
