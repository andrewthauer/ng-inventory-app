import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { throwIfAlreadyLoaded } from '../core';
import { environment } from '../../environments/environment';
import { appStoreRouterConfig } from './state';
import { reducers, metaReducers } from './reducers';
import { allEffects } from './effects';
import { CustomRouterStateSerializer } from './router';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(appStoreRouterConfig),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(allEffects),
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
})
export class AppStoreModule {
  constructor(@Optional() @SkipSelf() parentModule: AppStoreModule) {
    throwIfAlreadyLoaded(parentModule, 'AppStoreModule');
  }
}
