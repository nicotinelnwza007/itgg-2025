'use client';

import { ReactNode } from 'react';

type SecondaryLinkButtonProps = {
  href: string;
  children: ReactNode;
  disabled?: boolean;
  target?: '_blank' | '_self';
  rel?: string;
};

const SecondaryButton = ({
  href,
  children,
  disabled = false,
  target = '_self',
  rel = '',
}: SecondaryLinkButtonProps) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`w-full sm:w-auto ${
        disabled ? 'pointer-events-none opacity-50' : ''
      }`}
    >
      <div
        className="whitespace-nowrap w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-md border border-amber-700 text-white bg-amber-700 hover:bg-white hover:text-amber-700 shadow-md hover:scale-105 active:scale-95 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out h-11 px-6 py-2 text-lg sm:text-xl font-bold"
      >
        {children}
      </div>
    </a>
  );
};

export default SecondaryButton;
