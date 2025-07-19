import React from "react";
import Image from "next/image";

const AgendaEvents = [
  {
    side: "left",
    icon: "/icons/it.svg",
    title: "เปิดรับสมัครออนไลน์",
    date: "25 เม.ย. - 28 พ.ค.",
  },
  {
    side: "right",
    icon: "/icons/it.svg",
    title: "First meet online",
    date: "10 พ.ค.",
  },
  {
    side: "left",
    icon: "/icons/it.svg",
    title: "เปิดรับสมัครออนไซต์",
    date: "19 - 30 พ.ค.",
  },
  {
    side: "right",
    icon: "/icons/it.svg",
    title: "กิจกรรมออนไซต์",
    date: "5 มิ.ย.",
  },
];

const Agenda = () => {
  return (
    <div
      id="agenda"
      className="relative w-full max-w-2xl mx-auto px-6 py-16 scroll-mt-24"
    >
      <div className="relative flex flex-col items-center gap-16 md:before:block md:before:absolute md:before:top-0 md:before:bottom-0 md:before:left-1/2 md:before:-translate-x-1/2 md:before:w-2 md:before:bg-[#d7a86e]">
        {AgendaEvents.map((event, index) => (
          <div key={index} className="relative flex w-full justify-center">
            {/* Center dot */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#5d2a00] border-2 border-white rounded-full z-10 shadow-md" />

            {/* Event card */}
            <div
              className={`flex flex-col items-center ${
                event.side === "left"
                  ? "md:items-end md:text-right md:mr-auto"
                  : "md:items-start md:text-left md:ml-auto"
              } text-center max-w-[300px] md:max-w-[360px] p-6 rounded-2xl shadow-md border-2 border-white/30 space-y-2`}
            >
              <Image
                src={event.icon}
                alt={event.title}
                width={64}
                height={64}
                className="mb-2 mx-auto"
              />
              <h3 className="text-lg font-bold text-white">{event.title}</h3>
              <p className="text-sm text-white w-full text-center">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agenda;
