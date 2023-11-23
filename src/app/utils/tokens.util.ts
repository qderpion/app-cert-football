import { InjectionToken } from '@angular/core';
import { AppConfiguration } from '../interfaces';

/**
 * Permet d'injecter par DI la configuration de l'application
 */
export const APP_CONF = new InjectionToken<AppConfiguration>('APP_CONF');

/**
 * Permet d'injecter par DI l'URL de l'API
 */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

/**
 * Permet d'injecter par DI la clé de l'API
 */
export const API_KEY = new InjectionToken<string>('API_KEY');
