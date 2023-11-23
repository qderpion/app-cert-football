import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { RequestCacheEntry } from '../interfaces';
import { MINUTE } from '../utils/constants.util';

@Injectable({ providedIn: 'root' })
export class RequestCacheService {
  /**
   * Contient les réponses en cache
   */
  private cache = new Map<string, RequestCacheEntry>();
  /**
   * Durée de vie du cache en millisecondes
   */
  private maxAge = 10 * MINUTE;

  constructor() {
    /**
     * Nettoie le cache après un certain temps
     */
    interval(this.maxAge + MINUTE).subscribe({
      next: () => this.cleanExpiredCache(),
    });
  }

  /**
   * Permet de récupérer une réponse en cache
   * @param req url de la requête
   * @returns la réponse en cache ou undefined
   */
  public get(req: HttpRequest<unknown>): HttpResponse<unknown> | undefined {
    const cached = this.cache.get(req.urlWithParams);
    if (!cached) return undefined;

    const isExpired = cached.lastRead < Date.now() - this.maxAge;
    return isExpired ? undefined : cached.response;
  }

  /**
   * Permet de mettre en cache une réponse
   * @param req url de la requête
   * @param response réponse à mettre en cache
   */
  public set(req: HttpRequest<unknown>, response: HttpResponse<unknown>): void {
    const url = req.urlWithParams;
    const newEntry = { url, response, lastRead: Date.now() };
    this.cache.set(url, newEntry);
  }

  /**
   * Permet de nettoyer le cache des réponses expirées
   */
  private cleanExpiredCache(): void {
    const expired = Date.now() - this.maxAge;
    this.cache.forEach((entry) => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url);
      }
    });
  }
}
