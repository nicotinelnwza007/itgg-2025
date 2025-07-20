'use client';
import { useState, useEffect } from 'react';
import { Match, Participant } from '../types/tournament';

interface BracketClientProps {
  matches: Match[];
}

interface BracketRound {
  title: string;
  seeds: Match[];
}

export default function BracketClient({ matches = [] }: BracketClientProps) {
  const [bracketData, setBracketData] = useState<BracketRound[]>([]);

  useEffect(() => {
    if (!matches || !Array.isArray(matches) || matches.length === 0) {
      setBracketData([]);
      return;
    }

    // Group matches by round
    const rounds: { [key: string]: Match[] } = {};
    
    matches.forEach(match => {
      const roundText = match.tournamentRoundText;
      if (!rounds[roundText]) {
        rounds[roundText] = [];
      }
      rounds[roundText].push(match);
    });

    // Convert to bracket format
    const bracketRounds: BracketRound[] = Object.entries(rounds).map(([title, seeds]) => ({
      title,
      seeds: seeds.sort((a, b) => a.id.localeCompare(b.id))
    }));

    // Sort rounds by typical tournament progression
    const roundOrder = ['Round of 16', 'Quarterfinal', 'Semifinal', 'Final'];
    bracketRounds.sort((a, b) => {
      const aIndex = roundOrder.indexOf(a.title);
      const bIndex = roundOrder.indexOf(b.title);
      return aIndex - bIndex;
    });

    setBracketData(bracketRounds);
  }, [matches]);

  if (!matches || matches.length === 0) {
    return (
      <div className="text-center text-gray-400 p-8">
        <div className="bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-2">No Bracket Data</h3>
          <p>No matches available for this tournament.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bracket-container w-full overflow-x-auto pb-4">
      <div className="flex gap-8 min-w-max px-4">
        {bracketData.map((round, roundIndex) => (
          <div key={round.title} className="flex flex-col">
            {/* Round Header */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-white bg-gray-700 px-4 py-2 rounded-lg">
                {round.title}
              </h3>
            </div>

            {/* Matches in this round */}
            <div className="flex flex-col gap-6">
              {round.seeds.map((match, matchIndex) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface MatchCardProps {
  match: Match;
}

function MatchCard({ match }: MatchCardProps) {
  const getStateColor = (state: string) => {
    switch (state) {
      case 'DONE': return 'border-green-500 bg-green-900/20';
      case 'RUNNING': return 'border-yellow-500 bg-yellow-900/20';
      case 'SCHEDULED': return 'border-gray-500 bg-gray-800/50';
      default: return 'border-gray-500 bg-gray-800/50';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className={`border-2 rounded-lg p-4 min-w-[280px] ${getStateColor(match.state)}`}>
      {/* Match Header */}
      <div className="text-center mb-3">
        <h4 className="text-sm font-medium text-gray-300">{match.name}</h4>
        <p className="text-xs text-gray-400">{formatDate(match.startTime)}</p>
        <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
          match.state === 'DONE' ? 'bg-green-600 text-white' :
          match.state === 'RUNNING' ? 'bg-yellow-600 text-black' :
          'bg-gray-600 text-white'
        }`}>
          {match.state}
        </div>
      </div>

      {/* Participants */}
      <div className="space-y-2">
        {match.participants.map((participant, index) => (
          <ParticipantCard 
            key={participant.id} 
            participant={participant} 
            position={index}
          />
        ))}
      </div>
    </div>
  );
}

interface ParticipantCardProps {
  participant: Participant;
  position: number;
}

function ParticipantCard({ participant, position }: ParticipantCardProps) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${
      participant.isWinner 
        ? 'bg-green-900/30 border-green-500/50' 
        : 'bg-gray-800/50 border-gray-600/50'
    }`}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Logo placeholder */}
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-white">
            {participant.name.charAt(0)}
          </span>
        </div>
        
        {/* Team name */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${
            participant.isWinner ? 'text-white' : 'text-gray-300'
          }`}>
            {participant.name}
          </p>
        </div>
      </div>

      {/* Score */}
      <div className="flex-shrink-0 ml-2">
        <div className={`px-2 py-1 rounded text-sm font-bold min-w-[2rem] text-center ${
          participant.isWinner 
            ? 'bg-green-600 text-white' 
            : 'bg-gray-600 text-gray-200'
        }`}>
          {participant.resultText || '-'}
        </div>
      </div>

      {/* Winner indicator */}
      {participant.isWinner && (
        <div className="ml-2 flex-shrink-0">
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white">✓</span>
          </div>
        </div>
      )}
    </div>
  );
}