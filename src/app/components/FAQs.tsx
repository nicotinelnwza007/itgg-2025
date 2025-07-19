'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const faqs = [
  {
    question: 'ITGG คือกิจกรรมแบบไหน?',
    answer: 'ITGG (InfoTech GateGame) คือกิจกรรมแข่งขันภายในคณะไอทีลาดกระบัง ที่รวมความสนุก ความท้าทาย และการโชว์สกิลทั้งด้านเกม อีสปอร์ต และกีฬา',
  },
  {
    question: 'ต้องเก่งเกมหรือเก่งกีฬาถึงจะเข้าร่วมได้ไหม?',
    answer: 'ไม่ต้องเลย! กิจกรรมมีหลายสายให้เลือก ทั้งสายเกม, สายฮา, สายกีฬา น้องๆทุกคนสามารถเลือกได้ตามความสนใจเลย',
  },
  {
    question: 'ต้องสมัครยังไง?',
    answer: 'รอประกาศทางเพจ InfoTech GateGame หรือหน้าเว็บนี้เร็ว ๆ นี้ พร้อมเปิดรับสมัครในระบบออนไลน์',
  },
  {
    question: 'ถ้าไม่แข่ง แค่มาดูได้ไหม?',
    answer: 'ได้แน่นอน! มีกิจกรรมให้ร่วมสนุกเยอะมาก มาดู มาร่วมเชียร์ และรับของกิจกรรมไปได้เลย',
  },
  {
    question: 'ใครเข้าร่วมได้บ้าง?',
    answer: 'นักศึกษาคณะเทคโนโลยีสารสนเทศทุกชั้นปี สามารถเข้าร่วมได้',
  },
];

export default function FAQs() {
  const [active, setActive] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActive(active === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10 text-white" id="FAQs">
      <h2 className="text-3xl font-bold text-center mb-8">คำถามที่พบบ่อย</h2>
      <div className="space-y-4">
        {faqs.map((item, index) => (
          <div key={index} className="border-b border-white/50">
            <button
              className="w-full flex justify-between items-center py-4 text-left text-lg font-semibold transition-colors hover:text-white/80"
              onClick={() => toggle(index)}
            >
              <span>{item.question}</span>
              <motion.div
                animate={{ rotate: active === index ? 45 : 0 }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                {active === index ? <X size={24} /> : <Plus size={24} />}
              </motion.div>
            </button>
            <AnimatePresence mode="wait">
              {active === index && (
                <motion.div
                  key={`faq-${index}`}
                  initial={{ 
                    height: 0, 
                    opacity: 0,
                    y: -10
                  }}
                  animate={{ 
                    height: 'auto', 
                    opacity: 1,
                    y: 0
                  }}
                  exit={{ 
                    height: 0, 
                    opacity: 0,
                    y: -10
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                    opacity: { duration: 0.3 }
                  }}
                  style={{ overflow: 'hidden' }}
                  className="pb-4 pr-8"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ 
                      duration: 0.3,
                      delay: 0.1,
                      ease: "easeOut"
                    }}
                    className="text-sm sm:text-base text-white/90 leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}