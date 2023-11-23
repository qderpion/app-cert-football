import { Fixture, Standing } from '../interfaces';
import { GetFixturesResponse as FixtureResponseApi } from '../interfaces/api/get-fixtures-response.interface';
import { Standing as StandingApi } from '../interfaces/api/get-stagings-response.interface';

/**
 * Utilitaire de mapping des données "standing"
 */
export const mapStanding = (standing: StandingApi): Standing => {
  return {
    rank: standing.rank,
    team: standing.team,
    games: standing.all.played,
    points: standing.points,
    goalsDiff: standing.goalsDiff,
    win: standing.all.win,
    draw: standing.all.draw,
    lose: standing.all.lose,
  };
};

/**
 * Utilitaire de mapping des données "fixtureResponse"
 */
export const mapFixtureResponse = (fixture: FixtureResponseApi): Fixture => {
  return {
    teams: fixture.teams,
    score: fixture.score.fulltime,
  } as Fixture;
};
