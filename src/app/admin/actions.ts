'use server'

import { revalidatePath } from 'next/cache'
import { createServiceRoleClient } from '@/utils/supabase/server'

// Types for our data
export interface StudentProfile {
  nickname: string
  it_id: string
  score: number
  gate : string
}

export interface TeamGate {
  name: string
  score: number
}

// Get all student profiles for the select dropdown
export async function getStudentProfiles(): Promise<StudentProfile[]> {
  const supabase = await createServiceRoleClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .select('nickname, it_id, score, gate')
    .order('nickname')

  if (error) {
    console.error('Error fetching student profiles:', error)
    return []
  }

  return data || []
}

// Get all team gates
export async function getTeamGates(): Promise<TeamGate[]> {
  const supabase = await createServiceRoleClient()
  
  const { data, error } = await supabase
    .from('gates')
    .select('name, score')
    .order('name')

  if (error) {
    console.error('Error fetching team gates:', error)
    return []
  }

  return data || []
}

// Student score management functions
export async function increaseStudentScore(studentId: string, amount: number = 1): Promise<{ success: boolean; message: string }> {
  const supabase = await createServiceRoleClient()
  
  const { error } = await supabase.rpc('increment_student_score', {
    student_id_param: studentId,
    increment_amount: amount
  })

  if (error) {
    // If RPC doesn't exist, fall back to manual update
    const { data: currentData, error: fetchError } = await supabase
      .from('profiles')
      .select('score')
      .eq('it_id', studentId)
      .single()

    if (fetchError) {
      return { success: false, message: `Error fetching student score: ${fetchError.message}` }
    }

    const newScore = (currentData.score || 0) + amount
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ score: newScore })
      .eq('it_id', studentId)

    if (updateError) {
      return { success: false, message: `Error updating student score: ${updateError.message}` }
    }
  }

  revalidatePath('/admin')
  return { success: true, message: `Student score increased by ${amount}` }
}

export async function decreaseStudentScore(studentId: string, amount: number = 1): Promise<{ success: boolean; message: string }> {
  const supabase = await createServiceRoleClient()
  
  // Fetch current score first
  const { data: currentData, error: fetchError } = await supabase
    .from('profiles')
    .select('score')
    .eq('it_id', studentId)
    .single()

  if (fetchError) {
    return { success: false, message: `Error fetching student score: ${fetchError.message}` }
  }

  const newScore = Math.max(0, (currentData.score || 0) - amount) // Prevent negative scores
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ score: newScore })
    .eq('it_id', studentId)

  if (updateError) {
    return { success: false, message: `Error updating student score: ${updateError.message}` }
  }

  revalidatePath('/admin')
  return { success: true, message: `Student score decreased by ${amount}` }
}

export async function setStudentScore(studentId: string, newScore: number): Promise<{ success: boolean; message: string }> {
  const supabase = await createServiceRoleClient()
  
  const { error } = await supabase
    .from('profiles')
    .update({ score: Math.max(0, newScore) }) // Prevent negative scores
    .eq('it_id', studentId)

  if (error) {
    return { success: false, message: `Error setting student score: ${error.message}` }
  }

  revalidatePath('/admin')
  return { success: true, message: `Student score set to ${newScore}` }
}

// Team score management functions
export async function increaseTeamScore(teamName: string, amount: number = 1): Promise<{ success: boolean; message: string }> {
  const supabase = await createServiceRoleClient()
  
  const { data: currentData, error: fetchError } = await supabase
    .from('gates')
    .select('score')
    .eq('name', teamName)
    .single()

  if (fetchError) {
    return { success: false, message: `Error fetching team score: ${fetchError.message}` }
  }

  const newScore = (currentData.score || 0) + amount
  const { error: updateError } = await supabase
    .from('gates')
    .update({ score: newScore })
    .eq('name', teamName)

  if (updateError) {
    return { success: false, message: `Error updating team score: ${updateError.message}` }
  }

  revalidatePath('/admin')
  return { success: true, message: `${teamName} team score increased by ${amount}` }
}

export async function decreaseTeamScore(teamName: string, amount: number = 1): Promise<{ success: boolean; message: string }> {
  const supabase = await createServiceRoleClient()
  
  const { data: currentData, error: fetchError } = await supabase
    .from('gates')
    .select('score')
    .eq('name', teamName)
    .single()

  if (fetchError) {
    return { success: false, message: `Error fetching team score: ${fetchError.message}` }
  }

  const newScore = Math.max(0, (currentData.score || 0) - amount) // Prevent negative scores
  const { error: updateError } = await supabase
    .from('gates')
    .update({ score: newScore })
    .eq('name', teamName)

  if (updateError) {
    return { success: false, message: `Error updating team score: ${updateError.message}` }
  }

  revalidatePath('/admin')
  return { success: true, message: `${teamName} team score decreased by ${amount}` }
}

export async function setTeamScore(teamName: string, newScore: number): Promise<{ success: boolean; message: string }> {
  const supabase = await createServiceRoleClient()
  
  const { error } = await supabase
    .from('gates')
    .update({ score: Math.max(0, newScore) }) // Prevent negative scores
    .eq('name', teamName)

  if (error) {
    return { success: false, message: `Error setting team score: ${error.message}` }
  }

  revalidatePath('/admin')
  return { success: true, message: `${teamName} team score set to ${newScore}` }
}
