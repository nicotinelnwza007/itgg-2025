"use client";
import dynamic from "next/dynamic";

const Countdown = dynamic(() => import("./countdown"), {
  ssr: false,
});

const LandingCount = () => {
    // This time is in UTC (2025-07-21 17:00:00 UTC)
    const target = new Date(Date.UTC(2025, 6, 21, 17, 0, 0)); // GMT+0
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <Countdown targetTime={target} />
        </div>
    );
};

export default LandingCount;
