import { Team } from '../api/get-stagings-response.interface';

export interface Standing {
  rank: number;
  team: Team;
  games: number;
  win: number;
  lose: number;
  draw: number;
  goalsDiff: number;
  points: number;
}
