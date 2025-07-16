'use client'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

interface DailyQuest {
    id: string;
    question: string;
    score: number;
    hasAnswered: boolean;
    wasCorrect: boolean;
    date: string;
}

function SendAnswer() {
  const [dailyQuest, setDailyQuest] = useState<DailyQuest | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const toggleQuiz = () => setIsOpen(!isOpen)
  const closeModal = () => {
    setIsOpen(false)
    setMessage('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    const formData = new FormData(e.target as HTMLFormElement)
    const answer = formData.get('answer') as string

    try {
      const response = await fetch('/api/check_answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        // Refresh the quest data to update answered status
        // fetchDailyQuest()
      } else {
        setMessage(data.error || 'Failed to check answer')
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
      setMessage('Failed to submit answer')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fetchDailyQuest = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/check_answer', {
        method: 'GET',
      })

      if (response.ok) {
        const data = await response.json()
        setDailyQuest(data)
      } else {
        console.error('Failed to fetch daily quest')
        setDailyQuest(null)
      }
    } catch (error) {
      console.error('Error fetching daily quest:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDailyQuest()
  }, [])

  if (loading) {
    return (
      <div className="w-full px-4 py-10 relative">
        <div className="flex items-center justify-center">
          <div className="text-pink-600 text-lg">Loading today&apos;s quest...</div>
        </div>
      </div>
    )
  }

  if (!dailyQuest) {
    return (
      <div className="w-full px-4 py-10 relative">
        <div className="flex items-center justify-center">
          <div className="text-pink-600 text-lg">No quest available today</div>
        </div>
      </div>
    )
  }

  return (
      <div className="w-full px-4 py-10 relative">
        <div className="flex items-center justify-center">
          <button 
            onClick={toggleQuiz} 
            className={`button ${dailyQuest.hasAnswered ? 'opacity-75' : ''}`}
          >
            {dailyQuest.hasAnswered 
              ? (dailyQuest.wasCorrect ? '🎉 Quest Completed!' : '😔 Quest Attempted') 
              : '🎀 Start Quiz 🎀'
            }
          </button>
  
          <AnimatePresence>
            {isOpen && (
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
  
                <div className="text-center text-2xl font-bold text-pink-600 mb-4 mt-10">
                  🍭 {dailyQuest.question}
                </div>

                <div className="text-center text-sm text-pink-500 mb-4">
                  Reward: {dailyQuest.score} points
                </div>

                {dailyQuest.hasAnswered ? (
                  <div className="text-center space-y-4">
                    <div className={`text-lg font-bold ${dailyQuest.wasCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {dailyQuest.wasCorrect ? '✅ Correct Answer!' : '❌ Wrong Answer'}
                    </div>
                    <div className="text-pink-600">
                      {dailyQuest.wasCorrect 
                        ? `You earned ${dailyQuest.score} points!` 
                        : "Try again tomorrow for a new quest!"
                      }
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      name="answer"
                      type="text"
                      placeholder="Type your sweet answer..."
                      className="w-full px-4 py-3 border border-pink-400 rounded-xl bg-white text-pink-800 placeholder-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-300"
                      disabled={isSubmitting}
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-pink-400 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-5 py-3 rounded-full shadow transition"
                    >
                      {isSubmitting ? '⏳ Submitting...' : '✨ Send Answer'}
                    </button>
                  </form>
                )}

                {message && (
                  <div className={`mt-4 text-center font-semibold ${
                    message.includes('Correct') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {message}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
  )
}

export default SendAnswer