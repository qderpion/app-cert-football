import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { AuthApiInterceptor, CacheApiInterceptor } from './interceptors';
import { AppConfiguration } from './interfaces';
import { API_BASE_URL, API_KEY, APP_CONF } from './utils';

const provideTokens = (configuration: AppConfiguration) => {
  return [
    {
      provide: APP_CONF,
      useValue: configuration,
    },
    {
      provide: API_BASE_URL,
      useValue: configuration.api.url,
    },
    {
      provide: API_KEY,
      useValue: configuration.api.key,
    },
  ];
};

const provideInterceptors = () => {
  return [
    { provide: HTTP_INTERCEPTORS, useClass: AuthApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheApiInterceptor, multi: true },
  ];
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptorsFromDi()),
    provideTokens(environment),
    provideInterceptors(),
  ],
};
