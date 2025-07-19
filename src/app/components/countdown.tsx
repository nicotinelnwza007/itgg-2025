"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  targetTime: Date;
};

type TimeLeft = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Countdown({ targetTime }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const now = new Date().getTime();
    const distance = targetTime.getTime() - now;

    return {
      total: distance,
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);

      if (updated.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (timeLeft.total < 0) {
    return null;
  }

  return (
    <div className="relative flex justify-center items-center w-full h-screen bg-gradient-to-t from-[#e4a8d6] to-[#7a9dc6] overflow-hidden">
      {/* ☁️ Floating Clouds */}
      <img
        src="/cloud.png"
        alt="cloud"
        className="absolute w-40 sm:w-56 md:w-72 opacity-80 animate-float top-[15%] left-[5%] pointer-events-none"
      />
      <img
        src="/cloud.png"
        alt="cloud"
        className="absolute w-32 sm:w-48 md:w-64 opacity-60 animate-float top-[15%] right-[10%] pointer-events-none"
      />
      <img
        src="/cloud.png"
        alt="cloud"
        className="absolute w-32 sm:w-48 md:w-64 opacity-60 animate-float-slow top-[30%] right-[45%] pointer-events-none"
      />
      <img
        src="/cloud.png"
        alt="cloud"
        className="absolute w-32 sm:w-48 md:w-64 opacity-60 animate-float bottom-[20%] right-[15%] pointer-events-none"
      />
      <img
        src="/cloud.png"
        alt="cloud"
        className="absolute w-32 sm:w-48 md:w-64 opacity-60 animate-float-slow bottom-[5%] left-[15%] pointer-events-none"
      />

      {/* ⏳ Countdown Box */}
      <div className="z-10 rounded-xl backdrop-blur bg-white/25 border border-white/15 px-4 py-3 mx-auto flex flex-wrap justify-center items-end gap-1 sm:gap-2 md:gap-3 text-center text-lg sm:text-lg md:text-3xl lg:text-5xl font-medium text-white">
        <TimeBox label="Days" value={timeLeft.days} />
        <Colon />
        <TimeBox label="Hours" value={timeLeft.hours} />
        <Colon />
        <TimeBox label="Minutes" value={timeLeft.minutes} />
        <Colon />
        <TimeBox label="Seconds" value={timeLeft.seconds} />
      </div>
    </div>
  );
}

function Colon() {
  return (
    <div className="flex items-center justify-center h-[4.5rem] sm:h-[5.5rem] md:h-[8rem] lg:h-[10rem] px-1 sm:px-2">
      <span className="select-none font-bold leading-none text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-white">
        :
      </span>
    </div>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center justify-between px-2 py-3 sm:px-3 sm:py-4 h-[4.5rem] sm:h-[5.5rem] md:h-[8rem] lg:h-[10rem]">
      <div className="font-bold leading-none text-4xl sm:text-5xl md:text-7xl lg:text-9xl">
        {String(value).padStart(2, "0")}
      </div>
      <div className="uppercase tracking-wide text-xs sm:text-sm text-white">
        {label}
      </div>
    </div>
  );
}
