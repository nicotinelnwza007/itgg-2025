import React from "react";
import { Calendar, Users, Gamepad, Star, Flag } from "lucide-react";

const AgendaEvents = [
  {
    side: "left",
    icon: Calendar,
    title: "First Meet",
    date: "7 กค 16:30.",
  },
  {
    side: "right",
    icon: Calendar,
    title: "First day",
    date: "21 กค",
  },
  {
    side: "left",
    icon: Users,
    title: "รับสมัครนักกีฬาทั้งหมด ",
    date: "21 กค",
  },
  {
    side: "right",
    icon: Star,
    title: "Special Event ",
    date: "22 กค 16:00",
  },
  {
    side: "left",
    icon: Calendar,
    title: "Variety day ",
    date: "24 กค 16:30",
  },
  {
    side: "right",
    icon: Users,
    title: "ปิดรับสมัครกีฬา E-sports ",
    date: "25 กค",
  },
  {
    side: "left",
    icon: Gamepad,
    title: "เริ่มแข่งValorant และ Rov",
    date: "28 กค - 31 กค",
  },
  {
    side: "right",
    icon: Users,
    title: "ปิดรับสมัครนักกีฬา",
    date: "29 กค",
  },
  {
    side: "left",
    icon: Gamepad,
    title: "RoV และ Valorant รอบ Final",
    date: "31 กค และ 1 สค",
  },
  {
    side: "right",
    icon: Flag,
    title: "Last day",
    date: "6 สค",
  },
];

const Agenda = () => {
  return (
    <div
      id="agenda"
      className="relative w-full max-w-2xl mx-auto px-6 py-16 scroll-mt-24 flex flex-col"
    >
    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center pb-12">LOGIC GATE</span>
      <div className="relative flex flex-col items-center gap-16 md:before:block md:before:absolute md:before:top-0 md:before:bottom-0 md:before:left-1/2 md:before:-translate-x-1/2 md:before:w-2 md:before:bg-[#d7a86e]">
        {AgendaEvents.map((event, index) => {
          const IconComponent = event.icon;
          return (
            <div key={index} className="relative flex w-full justify-center">
              {/* Center dot */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#5d2a00] border-2 border-white rounded-full z-10 shadow-md" />

              {/* Event card */}
              <div
                className={`flex flex-col items-center ${
                  event.side === "left"
                    ? "md:items-end md:text-right md:mr-auto"
                    : "md:items-start md:text-left md:ml-auto"
                } text-center max-w-[300px] md:max-w-[360px] p-6 rounded-2xl space-y-2`}
              >
                <IconComponent size={64} color="white" className="mb-2 mx-auto" />
                <h3 className="text-lg font-bold text-white">{event.title}</h3>
                <p className="text-sm text-white w-full text-center">{event.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Agenda;