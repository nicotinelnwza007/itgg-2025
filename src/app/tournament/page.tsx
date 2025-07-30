'use client'
import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, Crown, Clock, MapPin, Zap } from 'lucide-react';

import { TOURNAMENT_DATA } from '../data/tournament';

// Type definitions
interface Participant {
  id: string;
  name: string;
  resultText?: string;
  isWinner?: boolean;
}

interface Match {
  id: string;
  participants: Participant[];
  tournamentRoundText: string;
  state: 'DONE' | 'RUNNING' | 'SCHEDULED';
  startTime?: string;
  venue?: string;
  time?: string;
}

interface TransformedMatch {
  id: string;
  team1: {
    id?: string;
    name?: string;
  } | string;
  team2: {
    id?: string;
    name?: string;
  } | string;
  score1?: string | number;
  score2?: string | number;
  winner?: string;
  status: 'completed' | 'live' | 'upcoming' | 'scheduled';
  date?: string;
  venue?: string;
  time?: string;
}

interface Round {
  id: string;
  name: string;
  matches: TransformedMatch[];
}

interface BracketData {
  rounds: Round[];
}

interface TournamentStats {
  totalMatches: number;
  completed: number;
  upcoming: number;
  live: number;
  totalTeams?: number;
}

const TournamentBracket: React.FC = () => {
  const [selectedTournament, setSelectedTournament] = useState<string>('valorant');
  const [bracketData, setBracketData] = useState<BracketData | null>(null);
  const [tournamentStats, setTournamentStats] = useState<TournamentStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter tournament data to only show Valorant and ROV
  const filteredTournamentData = {
    valorant: TOURNAMENT_DATA.valorant,
    rov: TOURNAMENT_DATA.rov
  };

  // Transform your data structure to match what the component expects
  const transformBracketData = (matches: Match[]): BracketData => {
    // Group matches by tournament round
    const roundsMap = new Map<string, TransformedMatch[]>();

    interface TransformedMatch {
      id: string;
      team1: Participant | string;
      team2: Participant | string;
      score1?: string | number;
      score2?: string | number;
      winner?: string;
      status: 'completed' | 'live' | 'upcoming' | 'scheduled';
      date?: string;
      venue?: string;
      time?: string;
    }

    // ✅ Define transformMatch INSIDE the function so it's in scope
    const transformMatch = (rawMatch: Match): TransformedMatch => ({
      id: rawMatch.id,
      team1: rawMatch.participants?.[0] ?? 'TBD',
      team2: rawMatch.participants?.[1] ?? 'TBD',
      score1:
        typeof rawMatch.participants?.[0] === 'object' && 'resultText' in rawMatch.participants[0]
          ? (rawMatch.participants[0] as Participant).resultText
          : undefined,
      score2:
        typeof rawMatch.participants?.[1] === 'object' && 'resultText' in rawMatch.participants[1]
          ? (rawMatch.participants[1] as Participant).resultText
          : undefined,
      winner: rawMatch.participants?.find(p => p.isWinner)?.id,
      status:
        rawMatch.state.toLowerCase() === 'done'
          ? 'completed'
          : rawMatch.state.toLowerCase() === 'running'
            ? 'live'
            : 'upcoming',
      date: rawMatch.startTime,
      venue: rawMatch.venue,
      time: rawMatch.time,
    });

    // ✅ Then use it in your loop
    matches.forEach(match => {
      const roundName = match.tournamentRoundText;
      if (!roundsMap.has(roundName)) {
        roundsMap.set(roundName, []);
      }

      const transformedMatch = transformMatch(match);
      roundsMap.get(roundName)!.push(transformedMatch);
    });

    // Convert to rounds array
    const rounds: Round[] = Array.from(roundsMap.entries()).map(([name, matches]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name: name,
      matches: matches
    }));

    // Optional: sort if needed
    const roundOrder: Record<string, number> = {
      'round of 32': 0,
      'first round': 1,
      'round of 16': 2,
      'quarterfinal': 3,
      'semifinal': 4,
      '3rd place': 5,
      'final': 6
    };

    rounds.sort((a, b) => (roundOrder[a.name.toLowerCase()] ?? 99) - (roundOrder[b.name.toLowerCase()] ?? 99));

    return { rounds };
  };


  // Fetch bracket data on component mount
  useEffect(() => {
    const fetchBracketData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/brackets.json');
        if (!response.ok) {
          throw new Error('Failed to fetch bracket data');
        }
        const data: Record<string, Match[]> = await response.json();

        // Get matches for selected tournament
        const tournamentMatches = data[selectedTournament] || [];

        // Transform the data structure
        const transformedData = transformBracketData(tournamentMatches);
        setBracketData(transformedData);

        // Calculate tournament stats
        const totalMatches = tournamentMatches.length;
        const completed = tournamentMatches.filter(match => match.state === 'DONE').length;
        const upcoming = tournamentMatches.filter(match => match.state === 'SCHEDULED').length;
        const live = tournamentMatches.filter(match => match.state === 'RUNNING').length;

        // Calculate total teams (approximate from first round)
        const firstRoundMatches = tournamentMatches.filter(match =>
          match.tournamentRoundText.toLowerCase().includes('first') ||
          match.tournamentRoundText.toLowerCase().includes('round of')
        );
        const totalTeams = firstRoundMatches.length * 2;

        setTournamentStats({
          totalMatches,
          completed,
          upcoming,
          live,
          totalTeams
        });

        setError(null);
      } catch (err) {
        console.error('Error fetching bracket data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBracketData();
  }, [selectedTournament]); // Re-fetch when tournament changes

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
          <p className="text-xl">Loading tournament data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Tournament</h2>
          <p className="text-gray-400">Failed to load bracket data: {error}</p>
        </div>
      </div>
    );
  }

  const currentTournament = filteredTournamentData[selectedTournament as keyof typeof filteredTournamentData];

  const MatchCard: React.FC<{ match: TransformedMatch; roundName: string; isSmall?: boolean }> = ({ match, roundName, isSmall = false }) => {
    const isCompleted = match.status === "completed";
    const isLive = match.status === "live";
    const isUpcoming = match.status === "upcoming" || match.status === "scheduled";

    // Helper function to get team name
    const getTeamName = (team: { id?: string; name?: string } | string): string => {
      if (typeof team === 'string') return team;
      return team?.name || '';
    };

    // Helper function to get team ID
    const getTeamId = (team: { id?: string; name?: string } | string): string | undefined => {
      if (typeof team === 'string') return undefined;
      return team?.id;
    };

    // Helper function to truncate team names
    const truncateTeamName = (name: string, maxLength: number = isSmall ? 12 : 16): string => {
      if (name.length <= maxLength) return name;
      return name.substring(0, maxLength - 3) + '...';
    };

    const team1Name = getTeamName(match.team1);
    const team2Name = getTeamName(match.team2);
    const team1Id = getTeamId(match.team1);
    const team2Id = getTeamId(match.team2);

    // Get scores from resultText or fallback to score1/score2
    const team1Score: string | number | undefined =
      match.score1 ??
      (typeof match.team1 === 'object' && 'resultText' in match.team1
        ? (match.team1 as Participant).resultText
        : undefined);

    const team2Score: string | number | undefined =
      match.score2 ??
      (typeof match.team2 === 'object' && 'resultText' in match.team2
        ? (match.team2 as Participant).resultText
        : undefined);



    return (
      <div className={`
      bg-gradient-to-br ${currentTournament.bgGradient} 
      ${currentTournament.borderColor} border-2 rounded-xl p-4 
      backdrop-blur-lg transition-all duration-500 
      hover:scale-105 hover:shadow-2xl ${currentTournament.glowColor}
      ${isLive ? `ring-2 ring-yellow-400/50 animate-pulse` : ''}
      ${isSmall ? 'w-[220px]' : 'w-[300px]'} group cursor-pointer
      relative overflow-hidden flex flex-col h-auto
    `}>

        {/* Live indicator */}
        {isLive && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-600 px-2 py-1 rounded-full text-xs z-10">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
            <span className="text-white font-bold">LIVE</span>
          </div>
        )}

        {/* Match Header */}
        <div className="flex items-center justify-between mb-3">
          <div className={`
          px-3 py-1 rounded-full text-xs font-bold 
          bg-gradient-to-r ${currentTournament.bgGradient} 
          ${currentTournament.borderColor} border
          ${currentTournament.color}
          flex-shrink-0
        `}>
            {roundName.toUpperCase()}
          </div>
          {match.date && (
            <div className="text-xs text-gray-400 flex items-center gap-1 flex-shrink-0">
              <Calendar size={10} />
              <span className="truncate max-w-[80px]">{match.date}</span>
            </div>
          )}
        </div>

        {/* VS Badge */}
        <div className="flex justify-center mb-3">
          <div className={`
          ${isUpcoming ? 'bg-gray-600' : currentTournament.accentColor} 
          text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg
        `}>
            VS
          </div>
        </div>

        {/* Teams Container - Fixed height and proper alignment */}
        <div className="flex flex-col gap-2 flex-grow">
          {/* Team 1 */}
          <div className={`
          flex items-center justify-between p-3 rounded-lg min-h-[60px]
          ${isCompleted && (Number(match.score1) > Number(match.score2) || match.winner === team1Id)
              ? `bg-gradient-to-r ${currentTournament.bgGradient} ${currentTournament.borderColor} border`
              : 'bg-gray-800/50 border border-gray-700/50'
            }
          transform transition-transform group-hover:translate-x-1
        `}>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {isCompleted && (Number(match.score1) > Number(match.score2) || match.winner === team1Id) && (
                <Crown size={14} className={`${currentTournament.color} flex-shrink-0`} />
              )}
              <div className={`
              ${isSmall ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'} 
              rounded-full flex items-center justify-center text-white font-bold
              ${isUpcoming ? 'bg-gray-600' : currentTournament.accentColor} shadow-lg
              flex-shrink-0
            `}>
                {team1Name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={`font-semibold text-white ${isSmall ? 'text-sm' : ''} truncate`}
                  title={team1Name}
                >
                  {truncateTeamName(team1Name)}
                </div>
              </div>
            </div>
            {!isUpcoming && match.score1 !== null && match.score1 !== undefined && (
              <div className={`
              ${isSmall ? 'text-lg' : 'text-xl'} font-bold 
              ${isCompleted && (Number(match.score1) > Number(match.score2) || match.winner === team1Id) ? currentTournament.color : 'text-gray-400'} 
              bg-gray-900/50 px-3 py-1 rounded min-w-[40px] text-center flex-shrink-0
            `}>
                {team1Score}
              </div>
            )}
          </div>

          {/* Team 2 */}
          <div className={`
          flex items-center justify-between p-3 rounded-lg min-h-[60px]
          ${isCompleted && (Number(team2Score) > Number(team1Score) || match.winner === team2Id)
              ? `bg-gradient-to-r ${currentTournament.bgGradient} ${currentTournament.borderColor} border`
              : 'bg-gray-800/50 border border-gray-700/50'
            }
          transform transition-transform group-hover:translate-x-1
        `}>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {isCompleted && (Number(team2Score) > Number(team1Score) || match.winner === team2Id) && (
                <Crown size={14} className={`${currentTournament.color} flex-shrink-0`} />
              )}
              <div className={`
              ${isSmall ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'} 
              rounded-full flex items-center justify-center text-white font-bold
              ${isUpcoming ? 'bg-gray-600' : currentTournament.accentColor} shadow-lg
              flex-shrink-0
            `}>
                {team2Name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className={`font-semibold text-white ${isSmall ? 'text-sm' : ''} truncate`}
                  title={team2Name}
                >
                  {truncateTeamName(team2Name)}
                </div>
              </div>
            </div>
            {!isUpcoming && team2Score !== null && team2Score !== undefined && team2Score !== '' && (
              <div className={`
              ${isSmall ? 'text-lg' : 'text-xl'} font-bold 
              ${isCompleted && (Number(team2Score) > Number(team1Score) || match.winner === team2Id) ? currentTournament.color : 'text-gray-400'} 
              bg-gray-900/50 px-3 py-1 rounded min-w-[40px] text-center flex-shrink-0
            `}>
                {team2Score}
              </div>
            )}
          </div>
        </div>

        {/* Match Status */}
        {isLive && (
          <div className="mt-3 text-center">
            <span className="text-xs text-yellow-400 font-semibold flex items-center justify-center gap-1">
              <Zap size={12} />
              Match in Progress
            </span>
          </div>
        )}

        {/* Match Info Footer */}
        {(match.venue || match.time) && (
          <div className="mt-3 pt-3 border-t border-gray-700/50 flex items-center justify-between gap-2">
            {match.venue && (
              <div className="flex items-center gap-1 text-xs text-gray-400 flex-1 min-w-0">
                <MapPin size={10} className="flex-shrink-0" />
                <span className="truncate" title={match.venue}>{match.venue}</span>
              </div>
            )}
            {match.time && (
              <div className="flex items-center gap-1 text-xs text-gray-400 flex-shrink-0">
                <Clock size={10} />
                <span>{match.time}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const RoundRow: React.FC<{ round: Round; isSmall?: boolean }> = ({ round, isSmall = false }) => (
    <div className="w-full mb-8">
      <div className="text-center mb-6">
        <h3 className={`${isSmall ? 'text-lg' : 'text-2xl'} font-bold text-white mb-2`}>
          {round.name}
        </h3>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto"></div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {round.matches?.map((match, index) => (
          <MatchCard
            key={match.id || index}
            match={match}
            roundName={round.name}
            isSmall={isSmall}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mt-28 text-white p-4 sm:p-6">

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className={`text-3xl sm:text-5xl font-bold mb-4 ${currentTournament.color}`}>
            {currentTournament.title}
          </h1>
        </div>

        {/* Tournament Selector - Only Valorant and ROV */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 px-2">
          {Object.entries(filteredTournamentData).map(([key, tournament]) => (
            <button
              key={key}
              onClick={() => setSelectedTournament(key)}
              className={`
                px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base
                ${selectedTournament === key
                  ? `${tournament.accentColor} text-white shadow-xl scale-105`
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                }
              `}
            >
              {tournament.title}
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        {tournamentStats && (
          <div className="flex justify-center mb-8 sm:mb-12 px-2">
            <div className={`
              inline-flex items-center gap-4 sm:gap-8 bg-gradient-to-r ${currentTournament.bgGradient}
              ${currentTournament.borderColor} border-2 px-4 sm:px-8 py-3 sm:py-4 rounded-2xl backdrop-blur-lg
              flex-wrap justify-center
            `}>
              {tournamentStats.totalMatches && (
                <>
                  <div className="text-center">
                    <div className={`text-xl sm:text-2xl font-bold ${currentTournament.color}`}>
                      {tournamentStats.totalMatches}
                    </div>
                    <div className="text-xs text-gray-400">Total Matches</div>
                  </div>
                  <div className="w-px h-6 sm:h-8 bg-gray-600/50 hidden sm:block"></div>
                </>
              )}
              {tournamentStats.completed !== undefined && (
                <>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-400">{tournamentStats.completed}</div>
                    <div className="text-xs text-gray-400">Completed</div>
                  </div>
                  <div className="w-px h-6 sm:h-8 bg-gray-600/50 hidden sm:block"></div>
                </>
              )}
              {tournamentStats.live > 0 && (
                <>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-red-400">{tournamentStats.live}</div>
                    <div className="text-xs text-gray-400">Live</div>
                  </div>
                  <div className="w-px h-6 sm:h-8 bg-gray-600/50 hidden sm:block"></div>
                </>
              )}
              {tournamentStats.upcoming !== undefined && (
                <>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-yellow-400">{tournamentStats.upcoming}</div>
                    <div className="text-xs text-gray-400">Upcoming</div>
                  </div>
                  <div className="w-px h-6 sm:h-8 bg-gray-600/50 hidden sm:block"></div>
                </>
              )}
              {tournamentStats.totalTeams && (
                <div className="text-center">
                  <div className={`text-xl sm:text-2xl font-bold ${currentTournament.color}`}>
                    {tournamentStats.totalTeams}
                  </div>
                  <div className="text-xs text-gray-400">Teams</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-screen mx-auto">
        <div
          className="bracket-scroll-container overflow-auto"
          style={{
            maxHeight: '70vh',
            minHeight: '400px'
          }}
          onMouseDown={(e) => {
            const container = e.currentTarget;
            const startX = e.pageX - container.offsetLeft;
            const startY = e.pageY - container.offsetTop;
            const scrollLeft = container.scrollLeft;
            const scrollTop = container.scrollTop;

            container.classList.add('dragging');

            const handleMouseMove = (e: MouseEvent) => {
              e.preventDefault();
              const x = e.pageX - container.offsetLeft;
              const y = e.pageY - container.offsetTop;
              const walkX = (x - startX) * 2;
              const walkY = (y - startY) * 2;
              container.scrollLeft = scrollLeft - walkX;
              container.scrollTop = scrollTop - walkY;
            };

            const handleMouseUp = () => {
              container.classList.remove('dragging');
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
          tabIndex={0}
          role="region"
          aria-label="Tournament bracket"
        >
          <div className="px-2 sm:px-4 py-4">
            {bracketData?.rounds?.map((round, index) => (
              <RoundRow
                key={round.id || index}
                round={round}
                isSmall={bracketData.rounds.length > 4}
              />
            ))}
          </div>
        </div>

        {/* Scroll Hint with improved animation */}
        {bracketData?.rounds?.length && bracketData.rounds.length > 2 && (
          <div className="flex justify-center mt-4 sm:mt-6">
            <div className="flex items-center gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm animate-pulse px-3 sm:px-4 py-2 bg-gray-800/30 rounded-full backdrop-blur-sm">
              <div className="flex gap-1">
                <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="hidden sm:inline font-medium">Click and drag to navigate • Scroll vertically</span>
              <span className="sm:hidden font-medium text-center">Touch and drag • Scroll</span>
              <div className="flex gap-1">
                <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Live Indicator */}
        {bracketData?.rounds?.some(round =>
          round.matches?.some(match => match.status === 'live')
        ) && (
            <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
              <div className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 px-3 sm:px-4 py-2 rounded-full shadow-lg border border-red-400/30">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-semibold tracking-wide">LIVE</span>
              </div>
            </div>
          )}
      </div>

    </div>
  );
};

export default TournamentBracket;