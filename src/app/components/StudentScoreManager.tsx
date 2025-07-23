'use client'

import { useState, useEffect } from 'react'
import {
	getStudentProfiles,
	increaseStudentScore,
	decreaseStudentScore,
	setStudentScore,
	type StudentProfile
} from '../admin/actions'

interface StudentScoreManagerProps {
	onMessage: (message: string, isError: boolean) => void
}

export default function StudentScoreManager({ onMessage }: StudentScoreManagerProps) {
	const [students, setStudents] = useState<StudentProfile[]>([])
	const [selectedStudentId, setSelectedStudentId] = useState<string>('')
	const [customAmount, setCustomAmount] = useState<string>('1')
	const [setScoreValue, setSetScoreValue] = useState<string>('')
	const [loading, setLoading] = useState(false)

	const [searchId, setSearchId] = useState<string>('') // search input
	const [autoSelected, setAutoSelected] = useState(false) // auto-select state

	useEffect(() => {
		loadStudents()
	}, [])

	const loadStudents = async () => {
		try {
			const studentData = await getStudentProfiles()
			setStudents(studentData)
		} catch {
			onMessage('Failed to load students', true)
		}
	}

	const filteredStudents = students.filter(student =>
		student.it_id.toLowerCase().includes(searchId.toLowerCase()) ||
		student.nickname.toLowerCase().includes(searchId.toLowerCase())
	)

	useEffect(() => {
		if (filteredStudents.length === 1) {
			setSelectedStudentId(filteredStudents[0].it_id)
			setAutoSelected(true)
		} else {
			setAutoSelected(false)
			setSelectedStudentId('')
		}
	}, [searchId, students])

	const selectedStudent = students.find(s => s.it_id === selectedStudentId)

	const handleIncrease = async () => {
		if (!selectedStudentId) {
			onMessage('Please select a student', true)
			return
		}

		setLoading(true)
		try {
			const amount = parseInt(customAmount) || 1
			const result = await increaseStudentScore(selectedStudentId, amount)
			onMessage(result.message, !result.success)
			if (result.success) {
				await loadStudents()
			}
		} catch {
			onMessage('Failed to increase score', true)
		} finally {
			setLoading(false)
		}
	}

	const handleDecrease = async () => {
		if (!selectedStudentId) {
			onMessage('Please select a student', true)
			return
		}

		setLoading(true)
		try {
			const amount = parseInt(customAmount) || 1
			const result = await decreaseStudentScore(selectedStudentId, amount)
			onMessage(result.message, !result.success)
			if (result.success) {
				await loadStudents()
			}
		} catch {
			onMessage('Failed to decrease score', true)
		} finally {
			setLoading(false)
		}
	}

	const handleSetScore = async () => {
		if (!selectedStudentId) {
			onMessage('Please select a student', true)
			return
		}

		if (!setScoreValue) {
			onMessage('Please enter a score value', true)
			return
		}

		setLoading(true)
		try {
			const score = parseInt(setScoreValue)
			if (isNaN(score)) {
				onMessage('Please enter a valid number', true)
				return
			}

			const result = await setStudentScore(selectedStudentId, score)
			onMessage(result.message, !result.success)
			if (result.success) {
				await loadStudents()
				setSetScoreValue('')
			}
		} catch {
			onMessage('Failed to set score', true)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="bg-white rounded-lg shadow-md p-6 border">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">Student Score Manager</h2>

			{/* Search Input */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Search by Student ID or Nickname:
				</label>
				<input
					type="text"
					value={searchId}
					onChange={(e) => setSearchId(e.target.value)}
					placeholder="Enter student ID or nickname"
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
					disabled={loading}
				/>
				{searchId && (
					<p className="text-sm text-gray-500 mt-1">
						{filteredStudents.length === 0 && 'No student found.'}
						{filteredStudents.length > 1 && `${filteredStudents.length} students match.`}
						{autoSelected && `Auto-selected: ${filteredStudents[0].nickname} (${filteredStudents[0].it_id})`}
					</p>
				)}
			</div>

			{/* Student Dropdown */}
			<div className="mb-4">
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Select Student:
				</label>
				<select
					value={selectedStudentId}
					onChange={(e) => setSelectedStudentId(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
					disabled={loading}
				>
					<option value="">Choose a student...</option>
					{filteredStudents.map((student) => (
						<option key={student.it_id} value={student.it_id}>
							{student.nickname} (ID: {student.it_id}) - Score: {student.score}
						</option>
					))}
				</select>
			</div>

			{/* Selected Info */}
			{selectedStudent && (
				<div className="mb-4 p-3 bg-gray-50 rounded-md">
					<p className="text-sm text-gray-600">
						<span className="font-semibold">Selected:</span> {selectedStudent.nickname} ({selectedStudent.it_id})
					</p>

					{/* Display gate */}
					{selectedStudent.gate && (
						<p className="text-sm text-purple-700">
							<span className="font-semibold">Gate:</span> {selectedStudent.gate.toUpperCase()}
						</p>
					)}

					<p className="text-lg font-bold text-amber-700">
						Current Score: {selectedStudent.score}
					</p>
				</div>
			)}

			{/* Score Operations */}
			<div className="space-y-4">
				{/* Increase/Decrease */}
				<div className="flex flex-col sm:flex-row gap-3">
					<div className="flex-1">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Amount:
						</label>
						<input
							type="number"
							value={customAmount}
							onChange={(e) => setCustomAmount(e.target.value)}
							min="1"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
							disabled={loading}
						/>
					</div>
					<div className="flex gap-2 sm:items-end">
						<button
							onClick={handleIncrease}
							disabled={loading || !selectedStudentId}
							className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							Increase
						</button>
						<button
							onClick={handleDecrease}
							disabled={loading || !selectedStudentId}
							className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							Decrease
						</button>
					</div>
				</div>

				{/* Set Score */}
				<div className="flex flex-col sm:flex-row gap-3">
					<div className="flex-1">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Set Score To:
						</label>
						<input
							type="number"
							value={setScoreValue}
							onChange={(e) => setSetScoreValue(e.target.value)}
							min="0"
							placeholder="Enter new score"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
							disabled={loading}
						/>
					</div>
					<div className="flex sm:items-end">
						<button
							onClick={handleSetScore}
							disabled={loading || !selectedStudentId || !setScoreValue}
							className="w-full sm:w-auto px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							Set Score
						</button>
					</div>
				</div>
			</div>

			{/* Refresh Button */}
			<div className="mt-4">
				<button
					onClick={loadStudents}
					disabled={loading}
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					Refresh Students
				</button>
			</div>
		</div>
	)
}
