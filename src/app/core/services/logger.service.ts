import { Injectable, InjectionToken } from '@angular/core';

export interface LoggerLike {
  info(message?: any, ...optionalParams: any[]);
  debug(message?: any, ...optionalParams: any[]);
  warm(message?: any, ...optionalParams: any[]);
  error(message?: any, ...optionalParams: any[]);
}

export let LoggerToken = new InjectionToken<LoggerLike>('app.logger');

@Injectable({
  providedIn: 'root',
})
export class Logger {
  constructor() {}

  info(message?: any, ...optionalParams: any[]) {
    console.log(message, optionalParams);
  }

  debug(message?: any, ...optionalParams: any[]) {
    console.debug(message, optionalParams); // tslint:disable-line no-console
  }

  warn(message?: any, ...optionalParams: any[]) {
    console.warn(message, optionalParams);
  }

  error(message?: any, ...optionalParams: any[]) {
    console.error(message, optionalParams);
  }
}
