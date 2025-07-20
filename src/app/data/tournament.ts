export const TOURNAMENT_DATA = {
  football: {
    title: "Football Championship",
    color: "text-green-400",
    bgGradient: "from-green-900/20 to-green-800/10",
    borderColor: "border-green-500/30",
    accentColor: "bg-green-500",
    glowColor: "shadow-green-500/20"
  },
  basketball: {
    title: "Basketball Tournament",
    color: "text-orange-400", 
    bgGradient: "from-orange-900/20 to-orange-800/10",
    borderColor: "border-orange-500/30",
    accentColor: "bg-orange-500",
    glowColor: "shadow-orange-500/20"
  },
  shareball: {
    title: "Shareball League",
    color: "text-purple-400",
    bgGradient: "from-purple-900/20 to-purple-800/10",
    borderColor: "border-purple-500/30",
    accentColor: "bg-purple-500",
    glowColor: "shadow-purple-500/20"
  },
  rov: {
    title: "RoV Championship",
    color: "text-blue-400",
    bgGradient: "from-blue-900/20 to-blue-800/10",
    borderColor: "border-blue-500/30",
    accentColor: "bg-blue-500",
    glowColor: "shadow-blue-500/20"
  },
  valorant: {
    title: "Valorant Masters",
    color: "text-red-400",
    bgGradient: "from-red-900/20 to-red-800/10",
    borderColor: "border-red-500/30",
    accentColor: "bg-red-500",
    glowColor: "shadow-red-500/20"
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
