'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

type PrimaryLinkButtonProps = {
  href: string;
  children: ReactNode;
  disabled?: boolean;
};

const PrimaryButton = ({ href, children, disabled = false }: PrimaryLinkButtonProps) => {
  return (
    <Link href={href} className="w-full sm:w-auto">
      <button
        disabled={disabled}
        className="whitespace-nowrap  w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-md border border-amber-700 text-white bg-amber-700 hover:bg-white hover:text-amber-700 shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out h-11 px-6 py-2 text-lg sm:text-xl font-bold"
      >
        {children}
      </button>
    </Link>
  );
};

export default PrimaryButton;
