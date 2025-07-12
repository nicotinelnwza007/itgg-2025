import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-20">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-4 sm:space-y-5 md:space-y-6">

        {/* Logo Section */}
        <div className="w-full flex justify-center">
          <Image
            src="/logo.jpg"
            width={500}
            height={500}
            alt="ITGG 2025 Logo"
            className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[320px] h-auto object-contain"
          />
        </div>

        {/* Text Section */}
        <div className="text-center px-2 sm:px-4 md:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-700 mb-2">
            ITGG-2025
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            perspiciatis quidem vitae enim debitis voluptas, quaerat modi velit
            numquam neque ipsum, odit repudiandae dolore natus tempore iusto.
          </p>
        </div>

        {/* Button Group */}
        <div className="flex flexrow gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto h-[10px]">
          <Link href="/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-md bg-amber-700 text-white shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out h-11 px-6 py-2 text-lg sm:text-xl font-bold">
              เข้าสู่ระบบ
            </button>
          </Link>

          <Link href="/know" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-md border border-amber-700 text-amber-700 bg-white hover:bg-amber-700 hover:text-white shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out h-11 px-6 py-2 text-lg sm:text-xl font-bold">
              เรียนรู้เพิ่มเติม
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;