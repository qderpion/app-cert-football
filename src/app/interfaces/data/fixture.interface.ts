export interface Fixture {
  teams: {
    home: Team;
    away: Team;
  };
  score: {
    home: number;
    away: number;
  };
}

export interface Team {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}
