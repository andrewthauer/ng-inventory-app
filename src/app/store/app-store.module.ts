import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { throwIfAlreadyLoaded } from '../core';
import { environment } from '../../environments/environment';

import { reducers, metaReducers } from './reducers';
import { allEffects } from './effects';
import { CustomRouterStateSerializer, routerStateKey } from './router';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({
      stateKey: routerStateKey,
      serializer: CustomRouterStateSerializer,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(allEffects),
  ],
})
export class AppStoreModule {
  constructor(@Optional() @SkipSelf() parentModule: AppStoreModule) {
    throwIfAlreadyLoaded(parentModule, 'AppStoreModule');
  }
}
