'use client'

import React, { useState } from 'react'
import { logout } from '../auth/actions'
import StudentScoreManager from '../components/StudentScoreManager'
import TeamScoreManager from '../components/TeamScoreManager'
import NotificationToast from '../components/NotificationToast'

function AdminPage() {
	const [notification, setNotification] = useState<{
		message: string
		isError: boolean
		isVisible: boolean
	}>({
		message: '',
		isError: false,
		isVisible: false
	})

	const showMessage = (message: string, isError: boolean) => {
		setNotification({
			message,
			isError,
			isVisible: true
		})
	}

	const closeNotification = () => {
		setNotification(prev => ({
			...prev,
			isVisible: false
		}))
	}

	const handleLogout = async () => {
		try {
			await logout()
		} catch {
			showMessage('Failed to logout', true)
		}
	}

	return (
		<div className="min-h-screen bg-gray-100 py-8 my-30">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="bg-white rounded-lg shadow-md p-6 mb-8">
					<div className="flex justify-between items-center">
						<div>
							<h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
							<p className="text-gray-600 mt-2">Manage student and team scores</p>
						</div>
						<button
							onClick={handleLogout}
							className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors"
						>
							Logout
						</button>
					</div>
				</div>

				{/* Score Management Sections */}
				<div className="space-y-8">
					{/* Student Score Manager */}
					<StudentScoreManager onMessage={showMessage} />

					{/* Team Score Manager */}
					<TeamScoreManager onMessage={showMessage} />
				</div>

				{/* Instructions */}
				<div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
					<h2 className="text-lg font-semibold text-blue-800 mb-2">How to Use</h2>
					<div className="text-blue-700 space-y-2">
						<p><strong>Student Scores:</strong> Select a student from the dropdown (showing nickname and IT ID), then use the buttons to increase, decrease, or set their score.</p>
						<p><strong>Team Scores:</strong> Manage scores for the four teams (AND, OR, NOR, NOT) using the individual controls or quick action buttons.</p>
						<p><strong>Tips:</strong> Use the refresh buttons to reload data if needed. All scores are automatically saved to the database.</p>
					</div>
				</div>
			</div>

			{/* Notification Toast */}
			<NotificationToast
				message={notification.message}
				isError={notification.isError}
				isVisible={notification.isVisible}
				onClose={closeNotification}
			/>
		</div>
	)
}

export default AdminPage