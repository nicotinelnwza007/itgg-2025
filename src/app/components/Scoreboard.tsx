"use client";

import { useState } from "react";
import Image from "next/image";

type Team = {
  name: string;
  color: string;
  cake: string;
};

const teams: Team[] = [
  { name: "Strawberry", color: "pink", cake: "/cake-layer.png" },
  { name: "Chocolate", color: "yellow", cake: "/cake-layer.png" },
  { name: "Mint", color: "green", cake: "/cake-layer.png" },
  { name: "Blueberry", color: "blue", cake: "/cake-layer.png" },
];

export default function SweetScoreboard() {
  const [scores, setScores] = useState<number[]>([3, 5, 2, 4]);

  const increment = (index: number) => {
    const updated = [...scores];
    updated[index]++;
    setScores(updated);
  };

  const decrement = (index: number) => {
    const updated = [...scores];
    if (updated[index] > 0) updated[index]--;
    setScores(updated);
  };

  return (
    <div className="z-40 min-h-screen w-[90%] overflow-x-hidden bg-white/25 backdrop-blur border border-white/15 text-white flex items-end py-10">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-screen-xl mx-auto">
        {teams.map((team, index) => (
          <div key={team.name} className="flex flex-col items-center w-full">
            {/* Cake stack */}
            <div className="relative h-64 w-20 sm:w-24 md:w-28 lg:w-32 flex flex-col-reverse items-center justify-start">
              {Array.from({ length: scores[index] }).map((_, i) => (
                <Image
                  key={i}
                  src={team.cake}
                  alt="cake"
                  width={120}
                  height={100}
                  className="object-contain -mt-2"
                />
              ))}
            </div>

            {/* Team name */}
            <p className={`text-${team.color}-400 font-semibold text-base md:text-lg mb-2 mt-3`}>
              {team.name}
            </p>

            {/* Control buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => increment(index)}
                className={`bg-${team.color}-500 hover:bg-${team.color}-600 text-white rounded-full px-3 py-1 text-lg`}
              >
                +
              </button>
              <button
                onClick={() => decrement(index)}
                className={`bg-${team.color}-500 hover:bg-${team.color}-600 text-white rounded-full px-3 py-1 text-lg`}
              >
                –
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
