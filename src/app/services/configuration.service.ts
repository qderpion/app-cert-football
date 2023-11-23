import { Inject, Injectable } from '@angular/core';
import { AppConfiguration, Country } from '../interfaces';
import { APP_CONF } from '../utils/tokens.util';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  /**
   * Constructeur
   * @param configuration configuration
   */
  constructor(
    @Inject(APP_CONF) private readonly configuration: AppConfiguration
  ) {}

  /**
   * Permet de récupérer les pays disponibles
   */
  public get countries(): Country[] {
    return this.configuration.leagues;
  }

  /**
   * Permet de récupérer l'URL de l'API
   */
  public get baseUrl(): string {
    return this.configuration.api.url;
  }

  /**
   * Permet de récupérer un path pour une opération de l'API
   * @param operation opération de l'API
   * @returns le path
   */
  public getPath(operation: string): string {
    return this.configuration.api.path[operation];
  }
}
