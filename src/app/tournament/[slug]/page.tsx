'use client';

import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import {use} from 'react';
import { TOURNAMENT_DATA } from './data';

const BracketClient = dynamic(() => import('@/app/components/BracketClient'), {
  ssr: false,
});

export default function TournamentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const tournament = TOURNAMENT_DATA[slug as keyof typeof TOURNAMENT_DATA];
  
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('../data/brackets.json');
        const data = await res.json();
        console.log('Bracket data:', data); // 
        setMatches(data[slug] || []);
      } catch (err) {
        console.error('Failed to load bracket data:', err);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [slug]);

  if (!tournament) return notFound();

  return (
    <main className="mt-22  flex flex-col items-center justify-center mx-auto text-white">
      <header className="px-4 py-4">
        <h1 className={`text-3xl font-bold text-center ${tournament.color}`}>
          {tournament.title}
        </h1>
      </header>

      <div className="flex-1 w-full overflow-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full text-gray-400">
            Loading bracket...
          </div>
        ) : matches.length > 0 ? (
          <div className="px-2 pb-4">
            <BracketClient matches={matches} />
          </div>
        ) : (
          <div className="text-center text-gray-400">
            No bracket data available.
          </div>
        )}
      </div>
    </main>
  );
}
