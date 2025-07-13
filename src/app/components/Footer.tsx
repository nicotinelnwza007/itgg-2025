"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-t from-[#2c4673] to-[#407793] text-white py-8 px-6">
      <div className="max-w-6xl mx-auto space-y-6 text-sm tracking-wide">
        {/* Logo Section */}
        <div className="flex flex-wrap items-center gap-6">
          <Image src="/logo.png" alt="Logo" width={50} height={50} className="object-contain" />
          <Image src="/it.png" alt="IT Logo" width={50} height={50} className="object-contain" />
          <Image src="/logo-kmitl.png" alt="KMITL Logo" width={50} height={50} className="object-contain" />
        </div>

        {/* Text Info */}
        <div className="space-y-1 leading-relaxed">
          <p className="text-base font-semibold text-[#F8D2A7]">
            กิจกรรมปรับพื้นฐานด้านการเขียนโปรแกรม Pre-Programming 68
          </p>
          <p>
            คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
          </p>
          <p>
            เลขที่ 1 ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพมหานคร 10520
          </p>
          <p>
            ติดต่อ:{" "}
            <a href="tel:+6627234900" className="underline">
              +66 (0) 2723 4900
            </a>{" "}
            หรือ{" "}
            <a href="tel:+6627234910" className="underline">
              +66 (0) 2723 4910
            </a>
          </p>
        </div>

        {/* Follow us */}
        <div className="text-[#F8D2A7] font-semibold">
          ติดตามข่าวสาร
          <div className="flex gap-4 mt-2">
            {/* ตัวอย่างไอคอน */}
            <a href="#" aria-label="Facebook">
              <Image src="/facebook.png" alt="Facebook" width={20} height={20} />
            </a>
            <a href="#" aria-label="Line">
              <Image src="/line.png" alt="Line" width={20} height={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
