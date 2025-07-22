"use client";

import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import About from "./components/About";
import Benefits from "./components/Benefits";
import Agenda from "./components/Agenda";
import Travelling from "./data/Travelling";
import FAQs from "./components/FAQs";
import ImageSlider from "./components/AutoImageSlide";
import SweetScoreboard from "./components/Scoreboard";
import SendAnswer from "./components/SendAnswer";

const Countdown = dynamic(() => import("./components/countdown"), {
  ssr: false,
});

export default function Home() {

  return (
    <div className="flex flex-col justify-center items-center overflow-x-hidden">
      {/* <LandingCount/>  */}
      <Hero />
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
