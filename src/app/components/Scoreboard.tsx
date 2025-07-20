"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

type Team = {
  name: string;
  color: string;
  bgColor: string;
  hoverColor: string;
};

const teams: Team[] = [
  { name: "AND", color: "text-pink-400", bgColor: "bg-pink-500", hoverColor: "hover:bg-pink-600" },
  { name: "OR", color: "text-yellow-400", bgColor: "bg-yellow-500", hoverColor: "hover:bg-yellow-600" },
  { name: "NOR", color: "text-green-400", bgColor: "bg-green-500", hoverColor: "hover:bg-green-600" },
  { name: "NOT", color: "text-blue-400", bgColor: "bg-blue-500", hoverColor: "hover:bg-blue-600" },
];

export default function SweetScoreboard() {
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0]);
  const [percentages, setPercentages] = useState<number[]>([0, 0, 0, 0]);

  const updatePercentages = (currentScores: number[]) => {
    const newPercentages = currentScores.map(score => (score / 50000) * 100);
    setPercentages(newPercentages);
  };

  useEffect(() => {
    const fetchScores = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('gates')
        .select('score, name')
        .order('name', { ascending: true });
        
      if (error) {
        console.error('Error fetching gates:', error);
      } else {
        // Map scores in AND, OR, NOR, NOT order
        const orderedScores = [
          data.find(gate => gate.name === 'AND')?.score || 0,
          data.find(gate => gate.name === 'OR')?.score || 0, 
          data.find(gate => gate.name === 'NOR')?.score || 0,
          data.find(gate => gate.name === 'NOT')?.score || 0
        ];
        
        setScores(orderedScores);
        updatePercentages(orderedScores);
      }
    }
    fetchScores();
  }, []);

  return (
    <div className="z-40 flex-col min-h-screen w-[100%] md:w-[90%] overflow-x-hidden bg-[#342016] backdrop-blur border border-[#c29533]  text-white flex items-center py-10 rounded-lg">
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center pb-12">SCOREBOARD</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-screen-xl mx-auto px-2">
        {teams.map((team, index) => (
          <div key={team.name} className="flex flex-col items-center w-full">
            {/* Score display */}
            <div className="mb-4 text-center">
              <p className={`${team.color} font-bold text-lg md:text-xl`}>
                {scores[index].toLocaleString()}
              </p>
            </div>

            {/* Vertical bar graph */}
            <div className="relative h-[32rem] w-full max-w-[12rem] bg-white/10 rounded-lg overflow-hidden">
              <div 
                className={`absolute bottom-0 w-full ${team.bgColor} transition-all duration-500 ease-out rounded-lg`}
                style={{ 
                  height: `${Math.min(percentages[index], 100)}%`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
              
              {/* Percentage text inside bar */}
              {percentages[index] > 5 && (
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <span className="text-white font-semibold text-xs">
                    {percentages[index].toFixed(1)}%
                  </span>
                </div>
              )}
            </div>

            {/* Team name */}
            <p className={`${team.color} font-semibold text-base md:text-lg mb-2 mt-3`}>
              {team.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
