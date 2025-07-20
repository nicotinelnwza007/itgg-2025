import React from 'react'
import { login, logout } from '../actions'
import { createClient } from '@/utils/supabase/server'

async function Page() {

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className='flex flex-col justify-center items-center h-screen space-y-4'>
        {user ? (
            <div className='flex flex-col items-center gap-4'>
                <div className='text-2xl font-bold mb-2 text-center text-white'>
                    You are already logged in
                    <p>{user?.email}</p>
                </div>
                <form action={logout}>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                    >
                        Logout
                    </button>
                </form>
            </div>
        ) : (
            <></>
        )}
        <form action={login} className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email"
                        placeholder="Enter your email" 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        placeholder="Enter your password" 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign in
                </button>
            </div>
        </form>
    </div>
  )
}

export default Page