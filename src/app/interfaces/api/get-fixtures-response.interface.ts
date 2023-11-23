/***********************************************************************************************
 * Code généré par https://quicktype.io -> alternative car erreurs dans le contrat openapi
 ***********************************************************************************************/

export interface GetFixturesResponse {
  fixture: Fixture;
  league: League;
  teams: Goals;
  goals: Goals;
  score: Score;
}

export interface Fixture {
  id: number;
  referee: null | string;
  timezone: string;
  date: Date;
  timestamp: number;
  periods: Periods;
  venue: Venue;
  status: Status;
}

export interface Periods {
  first: number | null;
  second: number | null;
}

export interface Status {
  long: Long;
  short: Short;
  elapsed: number | null;
}

export type Long = 'Match Finished' | 'Not Started' | 'Match Postponed';

export type Short = 'FT' | 'NS' | 'PST';

export interface Venue {
  id: number;
  name: string;
  city: string;
}

export interface Goals {
  home: AwayUnion;
  away: AwayUnion;
}

export type AwayUnion = AwayClass | number | null;

export interface AwayClass {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
}

export interface Score {
  halftime: Goals;
  fulltime: Goals;
  extratime: Goals;
  penalty: Goals;
}
