'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import hljs from 'highlight.js'
import python from 'highlight.js/lib/languages/python'
import 'highlight.js/styles/github.css'

interface DailyQuest {
	id: string
	question: string
	score: number
	code: string | null
	image: string | null
	hasAnsweredCorrectly: boolean
	date: string
	type: 'text' | 'image'
}

export default function SendAnswer() {
	const [dailyQuest, setDailyQuest] = useState<DailyQuest | null>(null)
	const [answer, setAnswer] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [loading, setLoading] = useState(true)
	const [message, setMessage] = useState('')

	// Fetch quest from API
	const fetchDailyQuest = async () => {
		setLoading(true)
		setMessage('')
		try {
			const res = await fetch('/api/check_answer')
			if (!res.ok) {
				throw new Error('Failed to fetch quest')
			}
			const data = await res.json()
			if (data && data.id) {
				setDailyQuest(data)
			} else {
				setDailyQuest(null) // No quest available
			}
		} catch (error) {
			setMessage('Error fetching quest')
			setDailyQuest(null)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchDailyQuest()
	}, [])

	useEffect(() => {
		hljs.registerLanguage('python', python)
		hljs.highlightAll()
	}, [dailyQuest])

	const toggleQuiz = () => setIsOpen(!isOpen)
	const closeModal = () => {
		setIsOpen(false)
		setMessage('')
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!dailyQuest) return

		setIsSubmitting(true)
		setMessage('')

		try {
			const res = await fetch('/api/submit_answer', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: dailyQuest.id, answer }),
			})
			const data = await res.json()
			if (res.ok) {
				setDailyQuest({ ...dailyQuest, hasAnsweredCorrectly: true })
				setMessage(data.message || '✅ Correct!')
			} else {
				setMessage(data.message || '❌ Incorrect answer')
			}
		} catch {
			setMessage('⚠️ Submission error')
		} finally {
			setIsSubmitting(false)
		}
	}

	if (loading) {
		return (
			<div className="text-center py-10 text-[#6b3e1d]">
				Loading today&apos;s quest...
			</div>
		)
	}

	if (!dailyQuest) {
		return (
			<div className="flex flex-col items-center mt-10 space-y-4">
				<div className="text-[#a05a2c] text-lg">ไม่มีภารกิจในขณะนี้</div>
				<button
					onClick={fetchDailyQuest}
					className="bg-[#a05a2c] hover:bg-[#804621] text-white font-bold py-3 px-6 rounded-full text-lg transition"
				>
					ลองโหลดภารกิจใหม่
				</button>
			</div>
		)
	}

	return (
		<div className="w-full px-4 py-10 relative">
			<div className="flex items-center justify-center">
				<button onClick={toggleQuiz} className="button">
					{dailyQuest.hasAnsweredCorrectly ? '🎉 Quest Completed!' : '🎀 Start Quiz 🎀'}
				</button>

				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeOut' }}
							className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-pink-50 border-2 rounded-[2rem] p-8 shadow-2xl"
						>
							<button
								onClick={closeModal}
								className="absolute top-4 right-4 text-[#a05a2c] hover:text-[#a05a2cc7] z-10"
							>
								<X size={38} />
							</button>

							{dailyQuest.code && (
								<pre className="mb-4 rounded-lg p-4 overflow-x-auto">
									<code
										className="hljs language-python"
										dangerouslySetInnerHTML={{
											__html: hljs.highlight(dailyQuest.code, {
												language: 'python',
											}).value,
										}}
									/>
								</pre>
							)}

							<div className="text-center text-2xl font-bold text-[#6b3e1d] mb-4 mt-10">
								🍭 {dailyQuest.question}
							</div>
							<div className="text-center text-sm text-[#a05a2c] mb-4">
								Reward: {dailyQuest.score} points
							</div>

                            <div className="text-center text-sm text-[#a05a2c] mb-2">
	(Type: {dailyQuest.type === 'image' ? 'image' : dailyQuest.type})
</div>

							{dailyQuest.hasAnsweredCorrectly ? (
								<div className="text-center space-y-4">
									<div className="text-lg font-bold text-green-600">🎉 ภารกิจสำเร็จ!</div>
									<div className="text-md text-[#6b3e1d]">
										คุณได้ทำภารกิจประจำวันสำเร็จและได้รับ {dailyQuest.score} คะแนน!
									</div>
									<div className="text-sm text-amber-600">
										กลับมาใหม่พรุ่งนี้เพื่อรับภารกิจใหม่!
									</div>
								</div>
							) : dailyQuest.type === 'image' ? (
								<div className="text-center">
									<a href="https://discord.gg/smxy9qph" target="_blank" rel="noreferrer">
										<button className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-2 px-6 rounded-full transition text-md">
											📷 ส่งรูปใน Discord
										</button>
									</a>
								</div>
							) : (
								<form onSubmit={handleSubmit} className="space-y-4">
									<input
										name="answer"
										type="text"
										value={answer}
										onChange={(e) => setAnswer(e.target.value)}
										placeholder="Type your sweet answer..."
										className="w-full px-4 py-3 border border-[#a05a2c] rounded-xl bg-white text-[#6b3e1d] placeholder-[#a05a2c] focus:outline-none focus:ring-4 focus:ring-[#e8cbb5]"
										disabled={isSubmitting}
										required
									/>
									<button
										type="submit"
										disabled={isSubmitting}
										className="w-full bg-[#a05a2c] hover:bg-[#804621] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-5 py-3 rounded-full shadow transition"
									>
										{isSubmitting ? '⏳ Submitting...' : '✨ Send Answer'}
									</button>
								</form>
							)}
							{message && (
								<div
									className={`mt-4 text-center font-semibold ${message.includes('Correct') || message.includes('✅')
										? 'text-green-600'
										: 'text-red-600'
										}`}
								>
									{message}
								</div>
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)}