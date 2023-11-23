import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Fixture } from '../interfaces';
import { FootballService } from '../services/football.service';

/**
 * Permet de récupérer les fixtures d'une équipe
 */
export const FixturesResolver: ResolveFn<Fixture[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  footballService: FootballService = inject(FootballService)
): Observable<Fixture[]> => {
  // Récupère l'id de l'équipe
  const team = route.paramMap.get('id');
  // Récupère les fixtures de l'équipe
  return team ? footballService.getFixturesCurrentSeason(team) : of([]);
};
