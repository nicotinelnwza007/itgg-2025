'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const faqs = [
  {
    question: 'Lorem ipsum dolor sit amet?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    question: 'Ut enim ad minim veniam?',
    answer: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Duis aute irure dolor in reprehenderit?',
    answer: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    question: 'Excepteur sint occaecat cupidatat non proident?',
    answer: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    question: 'Curabitur pretium tincidunt lacus?',
    answer: 'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.',
  },
];

export default function FAQs() {
  const [active, setActive] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActive(active === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10 text-white" id="#FAQs">
      <h2 className="text-3xl font-bold text-center mb-8">คำถามที่พบบ่อย</h2>
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div key={index} className="border-b border-white/50">
            <button
              className="w-full flex justify-between items-center py-4 text-left text-lg font-semibold"
              onClick={() => toggle(index)}
            >
              <span>{item.question}</span>
              {active === index ? <X size={24} /> : <Plus size={24} />}
            </button>
            <AnimatePresence initial={false}>
              {active === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden pb-4 pr-8 text-sm sm:text-base text-white/90"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
