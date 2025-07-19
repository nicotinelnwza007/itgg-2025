"use client";

import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import About from "./components/About";
import Benefits from "./components/Benefits";
import Agenda from "./components/Agenda";
import Travelling from "./components/Travelling";
import FAQs from "./components/FAQs";
import ImageSlider from "./components/AutoImageSlide";
import SweetScoreboard from "./components/Scoreboard";
import SendAnswer from "./components/SendAnswer";

const Countdown = dynamic(() => import("./components/countdown"), {
  ssr: false,
});

export default function Home() {
  // This time is in UTC (2025-07-21 17:00:00 UTC)
  const target = new Date(Date.UTC(2025, 6, 21, 17, 0, 0)); // GMT+0

  return (
    <div className="flex flex-col justify-center items-center">
      <Countdown targetTime={target} />
      <Hero />
      <SendAnswer/>
      <About />
      <SweetScoreboard />
      <Benefits />
      <Agenda />
      <Travelling />
      <FAQs />
      <ImageSlider />
    </div>
  );
}
