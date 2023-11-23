import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { RequestCacheService } from '../services/request-cache.service';
import { API_BASE_URL } from '../utils/tokens.util';

@Injectable({ providedIn: 'root' })
export class CacheApiInterceptor implements HttpInterceptor {
  /**
   * Constructeur
   * @param baseUrl Contient l'URL de base de l'API
   * @param requestCacheService Contient le service de cache
   */
  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    private readonly requestCacheService: RequestCacheService
  ) {}

  /**
   * Intercepte les requêtes HTTP
   */
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Si ce n'est pas une requête vers l'API, on laisse passer
    if (!this.isApiUrl(req.url)) return next.handle(req);

    // Si la requête n'est pas cacheable, on laisse passer
    const cacheable = this.isCacheable(req);
    if (!cacheable.statut) {
      return next.handle(req);
    }

    // Si la requête est cacheable, on regarde si on a déjà la réponse en cache
    const cachedResponse = this.requestCacheService.get(req);
    // Si on a déjà la réponse en cache, on la retourne
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next);
  }

  /**
   * Permet de savoir si la requête est une requête vers l'API
   * @param currentUrl url de la requête
   * @returns true si la requête est une requête vers l'API
   */
  private isApiUrl(currentUrl: string): boolean {
    return currentUrl.startsWith(this.baseUrl);
  }

  /**
   * Permet de savoir si la requête est cacheable
   * @param req requête
   * @returns true si la requête est cacheable
   * @TODO ajout d'un httpContext pour gérer un motif NO_CACHE
   */
  private isCacheable(req: HttpRequest<unknown>): {
    statut: boolean;
    motif?: 'METHOD';
  } {
    // Si la requête n'est pas de type GET, on ne cache pas
    if (req.method !== 'GET') return { statut: false, motif: 'METHOD' };
    return { statut: true };
  }

  /**
   * Permet d'envoyer la requête et de mettre en cache la réponse
   */
  private sendRequest(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.requestCacheService.set(req, event);
        }
      })
    );
  }
}
