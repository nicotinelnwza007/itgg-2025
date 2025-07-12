"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "เกี่ยวกับ", href: "/about" },
  { label: "กำหนดการ", href: "/agenda" },
  { label: "FAQs", href: "#FAQs" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-screen-xl rounded-xl backdrop-blur bg-white/10 border border-white/10 px-4 py-3 text-white">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.jpg"
            width={40}
            height={40}
            alt="Logo"
            className="w-10 h-10 object-cover"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 font-semibold text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[#ad8a77] transition">
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="md:hidden">
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
            transition={{ duration: 0.2 }}
            className="flex flex-col mt-4 gap-3 md:hidden font-semibold"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#ad8a77] transition text-center"
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
