"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SendAnswer from "./SendAnswer";
import PrimaryButton from "./sub/PrimaryButton";
import { createClient } from "@/utils/supabase/client";

const Hero = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email ?? null);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    location.reload(); // refresh page to update UI
  };

  return (
    <section className="flex justify-center items-center w-full min-h-screen mt-8 px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-20 overflow-x-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-2 sm:space-y-5 md:space-y-2">
        {/* Logo Section */}
        <div className="w-full flex justify-center">
          <Image
            src="/logo/itgglogo.svg"
            width={600}
            height={600}
            quality={200}
            alt="ITGG 2025 Logo"
            className="w-full max-w-[290px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[550px] h-auto object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="text-center text-white">
          <h1 className="font-agbalumo text-5xl sm:text-5xl md:text-8xl font-bold mb-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,30)] break-words max-w-full text-center">
            ITGG 2025
          </h1>
          <p className="text-base sm:text-lg md:text-2xl leading-relaxed max-w-5xlxl mx-auto mt-12">
            Infotech Tournament GateGame หรือ ITGG 2025 : มหกรรมการแข่งขันที่ยิ่งใหญ่ที่สุดในไอทีลาดกระบัง เตรียมตัวให้พร้อม! กับเวทีโชว์ศักยภาพ ทักษะด้านกีฬา และ E-Sport
          </p>
        </div>

        <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto h-[10px] mt-12">
          {userEmail ? (
            <button
              onClick={handleLogout}
              className="whitespace-nowrap w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-md border border-amber-700 text-white bg-amber-700 hover:bg-white hover:text-amber-700 shadow-md hover:scale-105 active:scale-95 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out h-11 px-6 py-2 text-lg sm:text-xl font-bold"

            >
              Logout
            </button>
          ) : (
            <PrimaryButton href="/auth/login">เข้าสู่ระบบ</PrimaryButton>
          )}

          {/* <PrimaryButton href="/tournament">ตารางการแข่งขัน</PrimaryButton> */}
        </div>

        <SendAnswer />
      </div>
    </section>
  );
};

export default Hero;
