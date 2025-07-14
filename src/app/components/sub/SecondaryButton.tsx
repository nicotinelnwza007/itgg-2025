// components/FilledLinkButton.tsx
'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

type FilledLinkButtonProps = {
  href: string;
  children: ReactNode;
  disabled?: boolean;
};

const SecondaryButton = ({ href, children, disabled = false }: FilledLinkButtonProps) => {
  return (
    <Link href={href} className="w-full sm:w-auto">
      <button
        disabled={disabled}
        className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-md bg-amber-700 text-white shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out h-11 px-6 py-2 text-sm sm:text-base font-bold"
      >
        {children}
      </button>
    </Link>
  );
};

export default SecondaryButton;
