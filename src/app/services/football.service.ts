import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { Country, Fixture, Standing } from '../interfaces';
import { GetFixturesResponse } from '../interfaces/api/get-fixtures-response.interface';
import { GetStagingsResponse } from '../interfaces/api/get-stagings-response.interface';
import { ApiResponse } from '../interfaces/api/response.interface';
import { mapFixtureResponse, mapStanding } from '../utils/mapping.utils';
import { ConfigurationService } from './configuration.service';
import { FootballApiService } from './football-api.service';

@Injectable({
  providedIn: 'root',
})
export class FootballService {
  /**
   * Les pays disponibles
   */
  public readonly countries = this.configurationService.countries;

  /**
   * Behavior avec le pays sélectionné
   */
  private currentCountryBehavior$: BehaviorSubject<Country> =
    new BehaviorSubject(this.countries[0]);

  /**
   * Le pays sélectionné
   */
  public currentCountry$: Observable<Country> =
    this.currentCountryBehavior$.asObservable();

  /**
   * Les classements du pays sélectionné
   */
  public standingCurrentCountry$: Observable<Standing[]> =
    this.currentCountry$.pipe(
      switchMap((country: Country) =>
        this.getStandingsCurrentSeason(country.id)
      )
    );

  /**
   * Constructeur
   * @param configurationService configurationService
   * @param footballApiService footballApiService
   */
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly footballApiService: FootballApiService
  ) {}

  /**
   * Permet de définir le pays sélectionné
   * @param country le pays sélectionné
   */
  public setCurrentCountry(country: Country): void {
    this.currentCountryBehavior$.next(country);
  }

  /**
   * Permet de récuperer les standings de la saison en cours
   * @param league id de la league
   * @returns les standings de la saison en cours
   */
  private getStandingsCurrentSeason(league: number): Observable<Standing[]> {
    const year = new Date().getFullYear();
    return this.footballApiService
      .getStandings(year.toString(), league.toString())
      .pipe(
        map((response: ApiResponse<GetStagingsResponse>) => {
          return response.response[0]?.league.standings[0].reduce(
            (acc, standing) => {
              acc.push(mapStanding(standing));
              return acc;
            },
            [] as Standing[]
          );
        })
      );
  }

  /**
   * Permet de récupérer les fixtures de la saison en cours
   * @param team id de l'équipe
   * @param last nombre de fixtures à récupérer
   * @returns les fixtures de la saison en cours
   */
  public getFixturesCurrentSeason(
    team: string,
    last = 10
  ): Observable<Fixture[]> {
    const year = new Date().getFullYear();
    return this.footballApiService
      .getFixtures(year.toString(), team, last)
      .pipe(
        map((response: ApiResponse<GetFixturesResponse>) => {
          return response.response.map((fixtureResponse) => {
            return mapFixtureResponse(fixtureResponse);
          });
        })
      );
  }
}
