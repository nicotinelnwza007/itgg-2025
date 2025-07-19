"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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

// ✅ ย้ายออกนอก Component
function calculateTimeLeft(targetTime: Date): TimeLeft {
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

export default function Countdown({ targetTime }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetTime)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft(targetTime);
      setTimeLeft(updated);

      if (updated.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]); // ✅ เพิ่ม targetTime

  if (timeLeft.total < 0) return null;

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-screen bg-transparent overflow-hidden">
      {/* Floating Images */}
      <Image
        src="/dessert/cake1.svg"
        alt="top-left"
        className="absolute w-24 sm:w-32 md:w-48 opacity-80 animate-float top-[15%] left-[5%] pointer-events-none"
        width={200}
        height={250}
      />
      <Image
        src="/dessert/cake2.svg"
        alt="top-right"
        className="absolute w-24 sm:w-32 md:w-48 opacity-80 animate-float-slow top-[15%] right-[10%] pointer-events-none"
        width={200}
        height={250}
      />
      <Image
        src="/dessert/cake3.svg"
        alt="bottom-right"
        className="absolute w-24 sm:w-32 md:w-48 opacity-80 animate-float bottom-[20%] right-[15%] pointer-events-none"
        width={200}
        height={250}
      />
      <Image
        src="/dessert/cake4.svg"
        alt="bottom-left"
        className="absolute w-24 sm:w-32 md:w-48 opacity-80 animate-float-slow bottom-[5%] left-[15%] pointer-events-none"
        width={150}
        height={200}
      />

      <div className="relative flex justify-center items-center mb-6">
        <div className="absolute top-[-100px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,rgba(0,0,0,0)_70%)] blur-3xl opacity-80 pointer-events-none z-10"></div>

        <Image
          src="/logo/itgglogo.svg"
          width={450}
          height={450}
          alt="ITGG 2025 Logo"
          className="z-20 animate-float-slow max-w-[220px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[550px] h-auto object-contain"
        />
      </div>

      <div className="z-10 rounded-xl backdrop-blur bg-white/10 border border-white/10 px-4 py-3 mx-auto flex flex-wrap justify-center items-end gap-1 sm:gap-2 md:gap-3 text-center text-lg sm:text-lg md:text-3xl lg:text-5xl font-medium text-white text-glow">
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
      <div className="uppercase tracking-wide text-xs sm:text-sm text-white text-glow">
        {label}
      </div>
    </div>
  );
}
