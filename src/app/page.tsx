import Image from "next/image";
import Countdown from "./components/countdown";
import Hero from "./components/Hero";
import About from "./components/About";
import Agenda from "./components/Agenda";
import FAQs from "./components/FAQs";
export default function Home() {
    // Date.UTC(YEAR, MONTH_INDEX, DAY, HOUR, MINUTE, SECOND)
    // didnt convert to gmt +7 yet this is time gmt +0
    const target = new Date(Date.UTC(2025, 6, 21, 17, 0, 0));
    return (
        <div className="flex flex-col justify-center items-center font-bold text-9xl min-h-screen ">
            {/* <Countdown targetTime={target} /> */}
            <Hero/>
            <About/>
            <Agenda/>
            <FAQs/>
        </div>
    );
}
