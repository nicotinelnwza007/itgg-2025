'use client';

import Image from 'next/image';
import { Facebook, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#B2842E] border-t border-white/10 text-[#FAF1E5] py-8 px-6 ">
      <div className="max-w-6xl mx-auto space-y-6 text-lg tracking-wide">
        {/* Logo Section */}
        <div className="flex flex-wrap items-center gap-6">
          <Image src="/logo/itgglogo.svg" alt="Logo" width={80} height={80} className="object-contain" />
          <Image src="/it-kmitl.png" alt="IT Logo" width={80} height={80} className="object-contain bg-white rounded-full p-2" />
          <Image src="/kmitl.png" alt="KMITL Logo" width={80} height={80} className="object-contain" />
        </div>

        {/* Text Info */}
        <div className="space-y-1 leading-relaxed font-medium">
          <p className="text-base font-semibold text-[#FAF1E5]">
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

        <div className="text-[#FAF1E5] font-semibold">
          ติดตามข่าวสาร
          <div className="flex gap-4 mt-2">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-white transition-colors duration-300"
            >
              <Facebook size={24} className="text-[#FAF1E5]" />
            </a>
            <a
              href="#"
              aria-label="Line"
              className="hover:text-white transition-colors duration-300"
            >
              <MessageCircle size={24} className="text-[#FAF1E5]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
