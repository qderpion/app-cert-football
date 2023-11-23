import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetFixturesResponse } from '../interfaces/api/get-fixtures-response.interface';
import { GetStagingsResponse } from '../interfaces/api/get-stagings-response.interface';
import { ApiResponse } from '../interfaces/api/response.interface';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root',
})
export class FootballApiService {
  /**
   * Constructeur
   * @param configurationService configurationService
   * @param httpClient httpClient
   */
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly httpClient: HttpClient
  ) {}

  /**
   * Get fixtures
   * @param year année de la saison
   * @param team id de l'équipe
   * @param last nombre de matchs à récupérer
   */
  public getFixtures(
    year: string,
    team: string,
    last: number
  ): Observable<ApiResponse<GetFixturesResponse>> {
    return this.httpClient.get<ApiResponse<GetFixturesResponse>>(
      `${this.configurationService.baseUrl}${this.configurationService.getPath(
        'get-fixtures'
      )}`,
      {
        params: new HttpParams()
          .set('team', team)
          .set('last', last)
          .set('season', year),
      }
    );
  }

  /**
   * Get standings
   * @param year année de la saison
   * @param league id de la league
   */
  public getStandings(
    year: string,
    league: string
  ): Observable<ApiResponse<GetStagingsResponse>> {
    return this.httpClient.get<ApiResponse<GetStagingsResponse>>(
      `${this.configurationService.baseUrl}${this.configurationService.getPath(
        'get-standings'
      )}`,
      {
        params: new HttpParams().set('league', league).set('season', year),
      }
    );
  }
}
