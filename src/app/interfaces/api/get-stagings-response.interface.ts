/***********************************************************************************************
 * Code généré par https://quicktype.io -> alternative car erreurs dans le contrat openapi
 ***********************************************************************************************/

export interface GetStagingsResponse {
  league: League;
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: Array<Standing[]>;
}

export interface Standing {
  rank: number;
  team: Team;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: null | string;
  all: All;
  home: All;
  away: All;
  update: Date;
}

export interface All {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: Goals;
}

export interface Goals {
  for: number;
  against: number;
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}
