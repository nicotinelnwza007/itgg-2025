'use client'
import { createClient } from '@/utils/supabase/client'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface Quest {
    question: string;
}

function SendAnswer() {
  const [quests, setQuests] = useState<Quest[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const toggleQuiz = () => setIsOpen(!isOpen)
  const closeModal = () => setIsOpen(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const answer = formData.get('answer') as string

    const response = await fetch('/api/check_answer', {
      method: 'POST',
      body: JSON.stringify({ answer }),
    })

    if (response.ok) {
      const data = await response.json()
      console.log(data)
    } else {
      console.error('Failed to check answer')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const supabase = await createClient()
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
      <div className="w-full px-4 py-10 relative">
        <div className="flex items-center justify-center">
          <button onClick={toggleQuiz} className="button">
            🎀 Start Quiz 🎀
          </button>
  
          <AnimatePresence>
            {isOpen && quests.length > 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 
                  w-[90%] max-w-md bg-pink-50 border-2 border-[#ec4899] rounded-[2rem] p-8 shadow-2xl"
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-5 text-pink-500 hover:text-pink-700 text-xl font-bold"
                >
                  ❌
                </button>
  
                <div className="text-center text-2xl font-bold text-pink-600 mb-15 mt-10">
                  🍭 {quests[0].question}
                </div>
  
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    name="answer"
                    type="text"
                    placeholder="Type your sweet answer..."
                    className="w-full px-4 py-3 border border-pink-400 rounded-xl bg-white text-pink-800 placeholder-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-300"
                  />
                  <button
                    type="submit"
                    className="w-full bg-pink-400 hover:bg-pink-600 text-white font-bold px-5 py-3 rounded-full shadow transition"
                  >
                    ✨ Send Answer
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
  )
}

export default SendAnswer