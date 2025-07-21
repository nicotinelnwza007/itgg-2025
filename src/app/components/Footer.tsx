'use client';

import Image from 'next/image';
import { Facebook, InstagramIcon } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#c29533] border-t border-white/10 text-[#FAF1E5] py-6 sm:py-8 lg:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Logo Section */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
          <Image
		  	quality={100}
            src="/logo/itgglogo.svg" 
            alt="ITGG Logo" 
            width={60} 
            height={60} 
            className="object-contain sm:w-25 sm:h-25" 
			/>
          <Image 
			quality={100}
            src="/it-kmitl.png" 
            alt="IT KMITL Logo" 
            width={60} 
            height={60} 
            className="object-contain rounded-full p-1.5 sm:p-2 sm:w-20 sm:h-20" 
			/>
          <Image 
			quality={100}
            src="/kmitl.png" 
            alt="KMITL Logo" 
            width={60} 
            height={60} 
            className="object-contain sm:w-20 sm:h-20" 
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Event Info */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <div className="space-y-2 sm:space-y-3 leading-relaxed">
              <h3 className="text-base sm:text-lg font-semibold text-[#FAF1E5] leading-tight">
                กิจกรรม InfoTech Tournament GateGame 2025 - ITGG 2025
                              </h3>
              
              <div className="text-sm sm:text-base space-y-1 sm:space-y-2 font-medium">
                <p className="leading-relaxed">
                  คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
                </p>
                <p className="leading-relaxed">
                  เลขที่ 1 ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพมหานคร 10520
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="pt-2 sm:pt-3">
              <p className="text-sm sm:text-base font-medium">
                <span className="block sm:inline">ติดต่อ: </span>
                <span className="space-x-2 sm:space-x-3">
                  <a 
                    href="tel:+6627234900" 
                    className="underline hover:text-white transition-colors duration-300 inline-block"
                  >
                    +66 (0) 2723 4900
                  </a>
                  <span className="hidden sm:inline">หรือ</span>
                  <span className="block sm:hidden">หรือ</span>
                  <a 
                    href="tel:+6627234910" 
                    className="underline hover:text-white transition-colors duration-300 inline-block"
                  >
                    +66 (0) 2723 4910
                  </a>
                </span>
              </p>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="lg:col-span-1 flex flex-col justify-start">
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-semibold text-[#FAF1E5]">
                ติดตามข่าวสาร
              </h4>
              <div className="flex gap-4 sm:gap-5">
                <Link
                  href="https://www.facebook.com/InfoTechGateGame/"
                  aria-label="Facebook Page"
                  className="group hover:scale-110 transition-all duration-300 ease-out"
				  target='_blank'
                >
                  <Facebook 
                    size={28} 
                    className="text-[#FAF1E5] group-hover:text-white transition-colors duration-300 sm:w-8 sm:h-8" 
                  />
                </Link>
                <Link
                  href="https://www.instagram.com/itgg.kmitl/"
                  aria-label="Line Official Account"
                  className="group hover:scale-110 transition-all duration-300 ease-out"
				  target='_blank'
                >
                  <InstagramIcon 
                    size={28} 
                    className="text-[#FAF1E5] group-hover:text-white transition-colors duration-300 sm:w-8 sm:h-8" 
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright/Bottom Section */}
        <div className="pt-4 sm:pt-6 border-t border-white/20">
          <p className="text-xs sm:text-sm text-center lg:text-left text-[#FAF1E5]/80 font-medium">
            © 2025 InfoTech Tournament GateGame - Faculty of Information Technology, KMITL
          </p>
        </div>
      </div>
    </footer>
  );
}