'use client'
import { createClient } from '@/utils/supabase/client'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface Quest {
    question: string;
    is_answered: boolean;
}

function SendAnswer() {
    const [active, setActive] = useState(0)
    const [quests, setQuests] = useState<Quest[]>([])
    const toggle = (index: number) => {
        setActive(active === index ? -1 : index)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const answer = formData.get('answer') as string;

        const response = await fetch('/api/check_answer', {
            method: 'POST',
            body: JSON.stringify({ answer }),
        })

        if (response.ok) {
            const data = await response.json();
            console.log(data)
        } else {
            console.error('Failed to check answer')
        }
    }

    // Fetch data from supabase
    useEffect(() => {
        const fetchData = async () => {
            const supabase = await createClient();
            const { data, error } = await supabase.from('quests').select('question, is_answered')
            if (error) {
                console.error(error)
            } else {
                console.log(data)
                setQuests(data)
            }
        }
        fetchData()
    }, [])
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10 text-white">
        <div className="space-y-4">
        {quests.map((item, index) => (
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
                    <form onSubmit={handleSubmit}>        
                        <input name="answer" type="text" className="w-full bg-transparent border-b border-white/50 text-white/90 focus:outline-none" />
                        <button type='submit' className="bg-white text-black px-4 py-2 rounded-md">Send</button>
                    </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SendAnswer