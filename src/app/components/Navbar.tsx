'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';

const navItems = [
  { label: 'หน้าหลัก', href: '#top' },
  { label: 'เกี่ยวกับ', href: '#about' },
  { label: 'กำหนดการ', href: '#agenda' },
  { label: 'FAQs', href: '#FAQs' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState<{ nickname: string | null, gate: string | null, score: number | null } | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const supabase = await createClient();
//       const { data: { user } } = await supabase.auth.getUser();

//       if (!user) return;

//       const { data: { nickname, gate, score } } = await supabase
//         .from('profiles')
//         .select('nickname, gate, score')
//         .eq('user', user?.id)
//         .single();
//       console.log(nickname, gate, score);
//       setUserData({ nickname: nickname || null, gate: gate || null, score: score || null });
//     };
//     fetchUser();
//   }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Improved scroll prevention without layout shift
  useEffect(() => {
    if (menuOpen) {
      // Get the current scroll position
      const scrollY = window.scrollY;
      // Apply styles to prevent scroll and maintain position
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Get the scroll position from the body style
      const scrollY = document.body.style.top;
      // Restore normal scrolling
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup function
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [menuOpen]);

  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-full rounded-xl backdrop-blur bg-white/10 border border-white/10 px-4 md:px-8 lg:px-12 text-white">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="#top" className="flex items-center flex-shrink-0">
          <Image
		  	quality={200}
            src="/logo/itgglogo.svg"
            width={80}
            height={80}
            alt="Logo"
            className="object-cover rounded-full"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 font-semibold text-lg">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[#ad8a77] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          {/* {userData && (
            <div className="whitespace-nowrap w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-md border border-amber-700 text-amber-700 bg-white hover:bg-amber-700 hover:text-white shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out h-11 px-6 py-2 text-lg sm:text-xl font-bold">
              <p className="text-lg">{userData.nickname}</p>
              <p className="text-lg">{userData.gate}</p>
              <p className="text-lg">คะแนน: {userData.score}</p>
            </div>
          )} */}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none flex-shrink-0 p-1"
          aria-label="Toggle navigation menu"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col mt-4 gap-4 font-semibold text-sm  rounded-lg p-4">
              {userData && (
                <div className="whitespace-nowrap w-full cursor-pointer inline-flex items-center justify-center gap-1 rounded-md border border-amber-700 text-amber-700 bg-white hover:bg-amber-700 hover:text-white shadow-md transition-all duration-200 ease-in-out h-11 px-4 py-2 text-sm font-bold">
                  <p>{userData.nickname}</p>
                  <p>{userData.gate}</p>
                  <p>คะแนน: {userData.score}</p>
                </div>
              )}
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className=" text-center py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}