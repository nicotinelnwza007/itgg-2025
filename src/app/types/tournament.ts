export interface Participant {
  id: string;
  name: string;
  resultText?: string;
  isWinner?: boolean;
}

export interface Match {
  id: string;
  participants: Participant[];
  tournamentRoundText: string;
  state: 'DONE' | 'RUNNING' | 'SCHEDULED';
  startTime?: string;
  venue?: string;
  time?: string;
}

export interface TransformedMatch {
  id: string;
  team1: { id?: string; name?: string } | string;
  team2: { id?: string; name?: string } | string;
  score1?: string | number;
  score2?: string | number;
  winner?: string;
  status: 'completed' | 'live' | 'upcoming' | 'scheduled';
  date?: string;
  venue?: string;
  time?: string;
}

export interface Round {
  id: string;
  name: string;
  matches: TransformedMatch[];
}

export interface BracketData {
  rounds: Round[];
}

export interface TournamentStats {
  totalMatches: number;
  completed: number;
  upcoming: number;
  live: number;
  totalTeams?: number;
}
