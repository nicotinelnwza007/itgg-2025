import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 w-full h-screen md:h-[90vh] lg:h-screen">
      <Image
        src="/logo.jpg"
        width={400}
        height={400}
        alt="Logo"
        className="max-w-full h-auto"
      />

      <div className="flex flex-col gap-4 py-4 text-center max-w-3xl">
        <h4 className="font-bold text-4xl">it gg-2025</h4>
        <div className="text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
          neque tenetur pariatur molestiae accusamus doloribus? Aliquam eveniet
          sed fuga veritatis nostrum dolorem accusamus non sequi possimus,
          veniam quaerat molestiae omnis.
        </div>
      </div>
.di
      <Link href="/login" className="w-full">
        <button className=" bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition">
          เข้าสู่ระบบ
        </button>
      </Link>
        <Link href="/login" className="w-full">
        <button className=" bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition">
          เข้าสู่ระบบ
        </button>
      </Link>
    </div>
  );
};

export default Hero;
