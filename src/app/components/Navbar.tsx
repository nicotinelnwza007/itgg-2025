"use client";

<<<<<<< HEAD
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
=======
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
>>>>>>> main

const navItems = [
  { label: "เกี่ยวกับ", href: "/about" },
  { label: "กำหนดการ", href: "/agenda" },
  { label: "FAQs", href: "/gallery" },
<<<<<<< HEAD
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  const renderNavLink = ({ label, href }: (typeof navItems)[number]) => (
    <Link
      key={href}
      href={href}
      className={`whitespace-nowrap transition-colors duration-300 hover:text-[#ad8a77] ${
        pathname === href ? "text-[#ad8a77]" : ""
      }`}
      onClick={() => setMenuOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <nav aria-label="Main navigation" className="z-50 text-[#FCD9C5]">
      <div className="fixed inset-x-2 sm:inset-x-4 lg:inset-x-6 top-2 sm:top-4 lg:top-6 mx-auto max-w-screen-xl h-14 sm:h-16 lg:h-20 px-3 sm:px-4 lg:px-6 flex items-center justify-between border-2 border-white/10 rounded-lg sm:rounded-xl backdrop-blur-sm bg-white/5">
        <Link href="/" aria-label="Home" className="flex items-center">
          <Image
            src="/logo.jpg"
            width={48}
            height={48}
            priority
            sizes="(max-width: 640px) 32px, (max-width: 1024px) 40px, 48px"
            alt="Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-20 xl:h-14 object-cover"
          />
        </Link>

        <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 font-bold text-sm lg:text-base">
          {navItems.map(renderNavLink)}
        </div>

        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="p-1 md:hidden"
        >
          <motion.div animate={{ rotate: menuOpen ? 90 : 0 }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[calc(theme(spacing.16)+theme(spacing.2))] sm:top-[calc(theme(spacing.20)+theme(spacing.4))] lg:top-[calc(theme(spacing.24)+theme(spacing.6))] inset-x-2 sm:inset-x-4 lg:inset-x-6 mx-auto max-w-screen-xl flex flex-col items-center gap-3 sm:gap-4 font-bold backdrop-blur-md bg-white/10 py-4 sm:py-6 rounded-b-lg sm:rounded-b-xl shadow-lg border-2 border-white/10 border-t-0 md:hidden z-40"
          >
            {navItems.map(renderNavLink)}
=======
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
>>>>>>> main
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
