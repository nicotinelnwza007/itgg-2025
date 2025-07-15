'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import {
  SingleEliminationBracket,
  SVGViewer,
} from '@g-loot/react-tournament-brackets';

type BracketClientProps = {
  matches: any[];
};

function CustomMatch({ match }: { match: any }) {
  return (
    <div className="text-gray-900 p-2 sm:p-4 rounded-xl border border-gray-300 min-w-[140px] sm:min-w-[180px] shadow-md bg-white">
      {match.participants.map((p: any, index: number) => (
        <div key={p.id} className="flex flex-col">
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            <img
              src={p.logoUrl || '/placeholder-team.png'}
              alt={p.name}
              className="w-4 h-4 sm:w-6 sm:h-6 rounded-full object-cover"
            />
            <span
              className={`text-xs sm:text-sm truncate ${
                p.isWinner ? 'font-bold text-green-600' : 'text-gray-900'
              }`}
            >
              {p.name}
            </span>
          </div>

          {index === 0 && (
            <div className="border-t border-gray-200 my-1 sm:my-2"></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function BracketClient({ matches }: BracketClientProps) {
  const [dimensions, setDimensions] = useState({ width: 2000, height: 900 });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const scaleFactor = 0.75;
      setDimensions({
        width: Math.floor(width * scaleFactor),
        height: Math.floor(height * scaleFactor),
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="w-full h-full bg-transparent overflow-x-auto">
      <div className="flex justify-center items-start min-w-fit py-6">
        <SingleEliminationBracket
          matches={matches}
          matchComponent={CustomMatch}
          svgWrapper={({ children, ...props }: { children: ReactNode; [key: string]: any }) => (
            <SVGViewer
              width={dimensions.width}
              height={dimensions.height}
              style={{ background: 'transparent' }}
              {...props}
            >
              {children}
            </SVGViewer>
          )}
        />
      </div>
    </div>
  );
}
