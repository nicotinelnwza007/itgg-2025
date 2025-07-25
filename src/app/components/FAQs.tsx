'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const faqs = [
  {
    question: 'ITGG คือกิจกรรมแบบไหน?',
    answer:
      'ITGG (Infotech Tournament GateGame) คือ กิจกรรมแข่งขันเกมภายในคณะเทคโนโลยีสารสนเทศ สจล. (KMITL) ที่รวมความสนุก ความท้าทาย และความสามารถทั้งด้านเกม วาไรตี้ E-Sport และกีฬา ',
  },
  {
    question: 'ต้องเก่งเกมหรือเก่งกีฬาถึงจะเข้าร่วมได้ไหม?',
    answer:
      'ไม่ต้องเลย! เพราะเราเปิดโอกาสให้ทุกคนมีส่วนร่วม อีกทั้งกิจกรรมมีหลายสายให้เลือก ทั้งสายเกม, สายฮา, สายกีฬา — ไม่ว่าจะเป็นทีมไหนก็สนุกได้หมด',
  },
  {
    question: 'ต้องสมัครยังไง?',
    answer:
      'รอติดตามจากเพจ Infotech Tournament GateGame หรือเว็บไซต์เร็ว ๆ นี้ โดยจะเปิดรับสมัครทางระบบออนไลน์',
  },
  {
    question: 'ถ้าไม่แข่ง แค่มาดูได้ไหม?',
    answer:
      'ได้แน่นอน! มีกิจกรรมให้ร่วมสนุกมากมาย มาร่วมให้กำลังใจนักกีฬา หรือมารับของรางวัลจากกิจกรรมได้เช่นกัน',
  },
  {
    question: 'ใครเข้าร่วมได้บ้าง?',
    answer: 'ชาวไอทีลาดกระบังสามารถเข้าร่วมได้เลยทุกชั้นปี!',
  },
];

export default function FAQs() {
  const [active, setActive] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActive(active === index ? null : index);
  };

  const maxHeight = 200; // max height in px for FAQ answer container

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10 text-white" id="FAQs">
      <h2 className="text-3xl font-bold text-center mb-8">คำถามที่พบบ่อย</h2>
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div key={index} className="border-b border-white/50">
            <button
              className="w-full flex justify-between items-center py-4 text-left text-lg font-semibold transition-colors hover:text-white/80"
              onClick={() => toggle(index)}
              aria-expanded={active === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span>{item.question}</span>
              <motion.div
                animate={{ rotate: active === index ? 45 : 0 }}
                transition={{
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                {active === index ? <X size={24} /> : <Plus size={24} />}
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {active === index && (
                <motion.div
                  id={`faq-answer-${index}`}
                  key={`faq-${index}`}
                  initial={{ maxHeight: 0, opacity: 0, y: -10 }}
                  animate={{ maxHeight: maxHeight, opacity: 1, y: 0 }}
                  exit={{ maxHeight: 0, opacity: 0, y: -10 }}
                  transition={{ maxHeight: { duration: 0.4 }, opacity: { duration: 0.3 }, y: { duration: 0.3 } }}
                  style={{ overflow: 'hidden' }}
                  className="pb-4 pr-8"
                >
                  <div className="text-sm sm:text-base text-white/90 leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
