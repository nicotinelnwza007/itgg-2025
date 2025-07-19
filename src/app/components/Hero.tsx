import React from "react";
import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "./sub/PrimaryButton";
const Hero = () => {
  return (
    <section className="flex justify-center items-center w-full min-h-screen px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-20">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6">
        {/* Logo Section */}
        <div className="w-full flex justify-center">
          <Image
            src="/logo/itgglogo.svg"
            width={600}
            height={600}
            alt="ITGG 2025 Logo"
            className="w-full max-w-[220px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[550px] h-auto object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="text-center  text-white">
          <h1 className="font-agbalumo text-3xl sm:text-4xl md:text-8xl font-bold mb-2 text-glow">
            ITGG-2025
          </h1>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mt-12">
            มหกรรมการแข่งขันสุดยิ่งใหญ่แห่งปีของชาวไอทีลาดกระบัง พร้อมเวทีโชว์ศักยภาพและทักษะสุดเร้าใจ  
            เตรียมตัวให้พร้อม! มาระเบิดความมันส์และปลดปล่อยพลังไปพร้อมกับพวกเรา
            </p>

        </div>

        {/* Button Group */}
        <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto h-[10px] mt-2">
          <PrimaryButton href="/auth/login">เข้าสู่ระบบ</PrimaryButton>

          <PrimaryButton href="/Schedule">ตารางการแข่งขัน</PrimaryButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
