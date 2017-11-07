import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from '../core/module-import-guard';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { appInitialState } from './state';
import { rootReducer } from './reducers';
import { allEffects } from './effects';

@NgModule({
  imports: [
    StoreModule.forRoot(rootReducer),
    StoreRouterConnectingModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    EffectsModule.forRoot(allEffects),
  ]
})
export class AppStoreModule {
  constructor(@Optional() @SkipSelf() parentModule: AppStoreModule) {
    throwIfAlreadyLoaded(parentModule, 'AppStoreModule');
  }
}
