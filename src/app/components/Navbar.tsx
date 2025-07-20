'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/utils/supabase/client';

const navItems = [
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

  // Optional: Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-screen-xl rounded-xl backdrop-blur bg-white/10 border border-white/10 px-4 py-3 text-white">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/itgglogo.svg"
            width={40}
            height={40}
            alt="Logo"
            className="w-14 h-104object-cover rounded-full"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-semibold text-lg">
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
          className="md:hidden focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col mt-4 gap-4 md:hidden font-semibold text-sm bg-white/20 backdrop-blur rounded-lg p-4"
          >
            {userData && (
              <div className="whitespace-nowrap w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-md border border-amber-700 text-amber-700 bg-white hover:bg-amber-700 hover:text-white shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out h-11 px-6 py-2 text-lg sm:text-xl font-bold">
                <p className="text-lg">{userData.nickname}</p>
                <p className="text-lg">{userData.gate}</p>
                <p className="text-lg">คะแนน: {userData.score}</p>
              </div>
            )}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#ad8a77] transition-colors text-center"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
