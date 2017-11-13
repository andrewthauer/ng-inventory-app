import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreModule, throwIfAlreadyLoaded, CustomRouterStateSerializer } from '../core';

import { appInitialState as initialState } from './state';
import { rootReducer } from './reducers';
import { allEffects } from './effects';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CoreModule,
    EffectsModule.forRoot(allEffects),
    StoreModule.forRoot(rootReducer),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
  ]
})
export class AppStoreModule {
  constructor(@Optional() @SkipSelf() parentModule: AppStoreModule) {
    throwIfAlreadyLoaded(parentModule, 'AppStoreModule');
  }
}
