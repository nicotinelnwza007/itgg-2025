'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { studentGateData } from '@/utils/itgate'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error)
    redirect('/error')
  }

  revalidatePath('/')
  redirect('/')
}

export async function register(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        gate: formData.get('gate') as string,
        nickname: formData.get('nickname') as string,
    }

    const gates = ['AND', 'OR', 'NOR', 'NOT'];
    const studentId = data.email.split('@')[0];

    // Check if email is from kmitl.ac.th
    if (!data.email.includes('@kmitl.ac.th')) {
        redirect('/error?message=Only KMITL email is allowed')
    }

    let assignedGate: string | null = null;
    
    // It22-23 student
    if (studentId.startsWith('67') || studentId.startsWith('68')) {
        // Find the student in the provided data
        const studentRecord = studentGateData.find(
            (record) => record.id === studentId
        );
    
        if (!studentRecord) {
            redirect('/error?message=Invalid student ID. Your ID is not found in the IT22-23 student list.');
        }
    
        // Assign the gate from the studentGateData
        assignedGate = studentRecord.gate;
    } else {
        // Check if student ID is valid (5 digits) and gate is valid
        if (!studentId.match(/^\d{5}$/) || !gates.includes(data.gate)) {
            redirect('/error?message=Invalid credentials. IT students must use student ID and a valid gate (AND, OR, NOR, NOT)')
        }
        assignedGate = data.gate;
    }

    const { error, data: { user } } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                email_confirmed_at: Date.now(),
                confirmed_at: Date.now(),
            },
        }
    })
    console.log(user)

    if (user) {
        await supabase.from('profiles').insert({
            user: user.id,
            gate: assignedGate,
            it_id: studentId,
            nickname: data.nickname,
        })
    }

    if (error) {
        redirect('/error?message=' + error.message)
    }

    revalidatePath('/')
    redirect('/')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/')
    redirect('/')
}