import React from "react";
import Image from "next/image";

const benefits = [
  {
    icon: "/dessert/hawaii.svg",
    title: "AND",
    bgColor: "bg-[#070158]",
    borderColor: "border-blue-300",
  },
  {
    icon: "/dessert/matcha.svg",
    title: "OR",
    bgColor: "bg-[#1a2f1c]",
    borderColor: "border-green-300",
  },
  {
    icon: "/dessert/strawberry.svg",
    title: "NOR",
    bgColor: "bg-[#390101]",
    borderColor: "border-pink-300",
  },
  {
    icon: "/dessert/macaron.svg",
    title: "NOT",
    bgColor: "bg-[#230d3d]",
    borderColor: "border-purple-300",
  },
];

const Benefits = () => {
  return (
    <section className="py-16 px-6 text-center text-white">
      <h2 className="text-3xl sm:text-4xl font-bold mb-12">
        GATE
      </h2>
       <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-8xl mx-auto">
        {benefits.map((item, index) => (
          <div
            key={index}
            className={`${item.bgColor} border-4 ${item.borderColor} rounded-3xl p-14 flex flex-col items-center shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out`}
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={125}
              height={125}
              className="mb-4"
            />
            <h3 className="text-2xl font-bold text-[#FAF1E5] mb-2 text-center">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;