'use client'

import { useState, useEffect } from 'react'
import { 
  getTeamGates, 
  increaseTeamScore, 
  decreaseTeamScore, 
  setTeamScore,
  type TeamGate 
} from '../admin/actions'

interface TeamScoreManagerProps {
  onMessage: (message: string, isError: boolean) => void
}

const TEAM_COLORS = {
  'AND': 'bg-blue-500 hover:bg-blue-600',
  'OR': 'bg-green-500 hover:bg-green-600', 
  'NOR': 'bg-red-500 hover:bg-red-600',
  'NOT': 'bg-purple-500 hover:bg-purple-600'
}

export default function TeamScoreManager({ onMessage }: TeamScoreManagerProps) {
  const [teams, setTeams] = useState<TeamGate[]>([])
  const [loading, setLoading] = useState(false)
  const [customAmounts, setCustomAmounts] = useState<Record<string, string>>({})
  const [setScoreValues, setSetScoreValues] = useState<Record<string, string>>({})

  useEffect(() => {
    loadTeams()
  }, [])

  const loadTeams = async () => {
    try {
      const teamData = await getTeamGates()
      setTeams(teamData)
      
      // Initialize custom amounts and set score values
      const initialAmounts: Record<string, string> = {}
      const initialSetValues: Record<string, string> = {}
      teamData.forEach(team => {
        initialAmounts[team.name] = '1'
        initialSetValues[team.name] = ''
      })
      setCustomAmounts(initialAmounts)
      setSetScoreValues(initialSetValues)
    } catch {
      onMessage('Failed to load teams', true)
    }
  }

  const handleIncrease = async (teamName: string) => {
    setLoading(true)
    try {
      const amount = parseInt(customAmounts[teamName]) || 1
      const result = await increaseTeamScore(teamName, amount)
      onMessage(result.message, !result.success)
      if (result.success) {
        await loadTeams()
      }
    } catch {
      onMessage(`Failed to increase ${teamName} score`, true)
    } finally {
      setLoading(false)
    }
  }

  const handleDecrease = async (teamName: string) => {
    setLoading(true)
    try {
      const amount = parseInt(customAmounts[teamName]) || 1
      const result = await decreaseTeamScore(teamName, amount)
      onMessage(result.message, !result.success)
      if (result.success) {
        await loadTeams()
      }
    } catch {
      onMessage(`Failed to decrease ${teamName} score`, true)
    } finally {
      setLoading(false)
    }
  }

  const handleSetScore = async (teamName: string) => {
    const scoreValue = setScoreValues[teamName]
    if (!scoreValue) {
      onMessage('Please enter a score value', true)
      return
    }

    setLoading(true)
    try {
      const score = parseInt(scoreValue)
      if (isNaN(score)) {
        onMessage('Please enter a valid number', true)
        return
      }

      const result = await setTeamScore(teamName, score)
      onMessage(result.message, !result.success)
      if (result.success) {
        await loadTeams()
        setSetScoreValues(prev => ({
          ...prev,
          [teamName]: ''
        }))
      }
    } catch {
      onMessage(`Failed to set ${teamName} score`, true)
    } finally {
      setLoading(false)
    }
  }

  const updateCustomAmount = (teamName: string, value: string) => {
    setCustomAmounts(prev => ({
      ...prev,
      [teamName]: value
    }))
  }

  const updateSetScoreValue = (teamName: string, value: string) => {
    setSetScoreValues(prev => ({
      ...prev,
      [teamName]: value
    }))
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Team Score Manager</h2>
        <button
          onClick={loadTeams}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Refresh Teams
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((team) => (
          <div key={team.name} className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">{team.name} Team</h3>
              <div className="text-2xl font-bold text-amber-700">
                Score: {team.score}
              </div>
            </div>

            {/* Increase/Decrease Operations */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={customAmounts[team.name] || '1'}
                  onChange={(e) => updateCustomAmount(team.name, e.target.value)}
                  min="1"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  disabled={loading}
                />
                <button
                  onClick={() => handleIncrease(team.name)}
                  disabled={loading}
                  className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  +
                </button>
                <button
                    onClick={() => handleDecrease(team.name)}
                  disabled={loading}
                  className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  -
                </button>
              </div>
            </div>

            {/* Set Score Operation */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Set Score To:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={setScoreValues[team.name] || ''}
                  onChange={(e) => updateSetScoreValue(team.name, e.target.value)}
                  min="0"
                  placeholder="Enter new score"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  disabled={loading}
                />
                <button
                  onClick={() => handleSetScore(team.name)}
                  disabled={loading || !setScoreValues[team.name]}
                  className={`px-4 py-2 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
                    TEAM_COLORS[team.name as keyof typeof TEAM_COLORS] || 'bg-gray-500 hover:bg-gray-600'
                  }`}
                >
                  Set
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleIncrease(team.name)}
                disabled={loading}
                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                +1
              </button>
              <button
                onClick={() => {
                  updateCustomAmount(team.name, '5')
                  handleIncrease(team.name)
                }}
                disabled={loading}
                className="flex-1 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                +5
              </button>
              <button
                onClick={() => handleDecrease(team.name)}
                disabled={loading}
                className="flex-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                -1
              </button>
              <button
                onClick={() => {
                  updateCustomAmount(team.name, '5')
                  handleDecrease(team.name)
                }}
                disabled={loading}
                className="flex-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
              >
                -5
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Statistics */}
      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">Overall Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {teams.map((team) => (
            <div key={team.name} className="text-center">
              <div className="font-bold text-gray-800">{team.name}</div>
              <div className="text-2xl font-bold text-amber-700">{team.score}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-center">
          <div className="text-sm text-gray-600">Total Score</div>
          <div className="text-3xl font-bold text-amber-700">
            {teams.reduce((sum, team) => sum + team.score, 0)}
          </div>
        </div>
      </div>
    </div>
  )
} 