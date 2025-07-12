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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="bg-[#3a225d] border border-purple-400 rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition"
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={40}
              height={40}
              className="mb-4"
            />
            <h3 className="text-xl font-bold text-[#fbd4c6] mb-2">
              {item.title}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-white">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
