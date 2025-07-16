import React from "react";
import Image from "next/image";

const benefits = [
  {
    icon: "/icons/it.svg",
    title: "เพิ่มทักษะ Coding",
    description:
      "กิจกรรมนี้จะสอนน้องตั้งแต่หลักคิดการเขียนโปรแกรม และสอนเขียนโปรแกรมด้วยภาษา Python",
  },
  {
    icon: "/icons/it.svg",
    title: "พบปะเพื่อนใหม่",
    description:
      "พบปะเมคเฟรน และร่วมกิจกรรมกับเพื่อนใหม่ชาวเฟรชชี่ สร้างมิตรภาพที่สวยงาม",
  },
  {
    icon: "/icons/it.svg",
    title: "ผจญภัยในคณะ",
    description:
      "ภายในกิจกรรมจะมีรอบออนไซต์ที่ให้น้อง ๆ มาร่วมกันทำกิจกรรมที่คณะกันแบบสด ๆ",
  },
];

const Benefits = () => {
  return (
    <section className="py-16 px-6 text-center text-white">
      <h2 className="text-3xl sm:text-4xl font-bold mb-12">
        ประโยชน์ของกิจกรรมนี้
      </h2>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="bg-[#fff3e0] border-4 border-[#d7a86e] rounded-3xl p-6 flex flex-col items-center shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={60}
              height={60}
              className="mb-4"
            />
            <h3 className="text-xl font-bold text-[#8b4513] mb-2 text-center">
              {item.title}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-[#5e3c1c] text-center">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
