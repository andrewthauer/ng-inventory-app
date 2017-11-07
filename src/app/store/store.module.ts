import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from '../core/module-import-guard';

import { StoreModule as NgRxStoreModule } from '@ngrx/store';
import { EffectsModule as NgRxEffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule as NgRxStoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule as NgRxStoreDevtoolsModule } from '@ngrx/store-devtools';

import { appInitialState } from './state';
import { rootReducer } from './reducers';
import { allEffects } from './effects';

@NgModule({
  declarations: [],
  imports: [
    NgRxStoreModule.forRoot(rootReducer),
    NgRxStoreRouterConnectingModule,
    NgRxStoreDevtoolsModule.instrument({ maxAge: 25 }),
    NgRxEffectsModule.forRoot(allEffects),
  ],
  exports: [],
  providers: []
})
export class StoreModule {
  constructor(@Optional() @SkipSelf() parentModule: StoreModule) {
    throwIfAlreadyLoaded(parentModule, 'StoreModule');
  }
}
