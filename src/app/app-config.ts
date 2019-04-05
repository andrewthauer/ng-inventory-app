import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export interface AppConfig {
  serviceUrl: string;
}

export let AppConfigToken = new InjectionToken<AppConfig>('app.config');

export const buildAppConfig = (serviceUrl = environment.apiUrl): AppConfig => ({
  serviceUrl: serviceUrl,
});
