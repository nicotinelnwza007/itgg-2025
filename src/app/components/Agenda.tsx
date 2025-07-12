import React from "react";
import Image from "next/image";

const AgendaEvents = [
    {
        side: "left",
        icon: "/it.png",
        title: "เปิดรับสมัครออนไลน์",
        date: "25 เม.ย. - 28 พ.ค.",
    },
    {
        side: "right",
        icon: "/it.png",
        title: "First meet online",
        date: "10 พ.ค.",
    },
    {
        side: "left",
        icon: "/it.png",
        title: "เปิดรับสมัครออนไซต์",
        date: "19 - 30 พ.ค.",
    },
    {
        side: "right",
        icon: "/it.png",
        title: "เปิดรับสมัครออนไซต์",
        date: "19 - 30 พ.ค.",
    },
];

const Agenda = () => {
    return (
        <div className="relative w-full max-w-2xl mx-auto px-6 py-16 scroll-mt-24" id="agenda">
            <div className="relative flex flex-col items-center gap-16 md:before:block md:before:absolute md:before:top-0 md:before:bottom-0 md:before:left-1/2 md:before:-translate-x-1/2 md:before:w-1 md:before:bg-purple-300">
                {AgendaEvents.map((event, index) => (
                    <div
                        key={index}
                        className="relative flex w-full justify-center"
                    >
                        {/* Center dot */}
                        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black border-2 border-white rounded-full z-10 shadow-lg" />

                        {/* Event block */}
                        <div
                            className={`flex flex-col items-center ${
                                event.side === "left"
                                    ? "md:items-center md:text-right md:mr-auto"
                                    : "md:items-center md:text-left md:ml-auto"
                            } text-center max-w-[200px] md:max-w-[240px]`}
                        >
                            <Image
                                src={event.icon}
                                alt={event.title}
                                width={64}
                                height={64}
                                className="mb-2"
                            />
                            <h3 className="text-xl font-semibold text-white">
                                {event.title}
                            </h3>
                            <p className="text-sm text-white">{event.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Agenda;
