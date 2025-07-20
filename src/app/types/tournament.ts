export const TOURNAMENT_DATA = {
  'football': {
    title: 'Football Championship',
    color: 'text-green-400'
  },
  'basketball': {
    title: 'Basketball Tournament',
    color: 'text-orange-400'
  },
  'rov': {
    title: 'Arena of Valor Championship',
    color: 'text-blue-400'
  },
  'valorant': {
    title: 'Valorant Masters',
    color: 'text-red-400'
  },
  'shareball': {
    title: 'Badminton Championship',
    color: 'text-yellow-400'
  }
} as const;

// File: src/app/types/tournament.ts
export interface Participant {
  id: string;
  name: string;
  logoUrl: string;
  isWinner: boolean;
  resultText: string;
}

export interface Match {
  id: string;
  name: string;
  nextMatchId: string | null;
  tournamentRoundText: string;
  startTime: string;
  state: 'DONE' | 'SCHEDULED' | 'RUNNING';
  participants: Participant[];
}

export interface Tournament {
  title: string;
  color: string;
}