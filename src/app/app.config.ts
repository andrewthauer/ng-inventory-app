import { InjectionToken } from '@angular/core';

export interface AppConfig {
  serviceUrl: string;
}

export let AppConfigToken = new InjectionToken<AppConfig>('app.config');

export const buildAppConfig = (serviceUrl = 'http://localhost:3000'): AppConfig => ({
  serviceUrl: serviceUrl
});
