import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_KEY } from '../utils/tokens.util';

@Injectable()
export class AuthApiInterceptor implements HttpInterceptor {
  /**
   * Constructeur
   * @param baseUrl Contient l'URL de base de l'API
   * @param apiKey Contient la clé de l'API
   */
  constructor(
    @Inject(API_BASE_URL) private readonly baseUrl: string,
    @Inject(API_KEY) private readonly apiKey: string
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

    // Si la requête est une requête vers l'API, on injecte les headers
    const authReq = this.injectHeaders(req);
    return next.handle(authReq);
  }

  /**
   * Permet de savoir si la requête est une requête vers l'API
   * @param url url de la requête
   * @returns true si la requête est une requête vers l'API
   */
  private isApiUrl(url: string): boolean {
    return url.startsWith(this.baseUrl);
  }

  /**
   * Permet d'injecter les headers
   * @param req requête
   * @returns la requête avec les headers injectés
   */
  private injectHeaders(req: HttpRequest<unknown>): HttpRequest<unknown> {
    return req.clone({
      headers: req.headers
        .set('x-rapidapi-host', this.baseUrl)
        .set('x-rapidapi-key', this.apiKey),
    });
  }
}
