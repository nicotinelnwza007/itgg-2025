import React from 'react'
import { login, logout } from '../actions'
import { createClient } from '@/utils/supabase/server'
import InputField from '@/app/components/InputField'

async function Page({ searchParams }: { searchParams: Promise<any> }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const message = (await searchParams).message;

    return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full  relative px-4 sm:px-6 lg:px-8 py-12">
            {user ? (
                <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center space-y-4">
                    <h2 className="text-2xl font-bold text-[#5e3c1b]">You're already logged in</h2>
                    <p className="text-[#8b5e3c]">{user.email}</p>
                    <form action={logout}>
                        <button
                            type="submit"
                            className="whitespace-nowrap w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-md border border-amber-700 text-white bg-amber-700 hover:bg-white hover:text-amber-700 shadow-md hover:scale-105 active:scale-95 outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out h-11 px-6 py-2 text-lg sm:text-xl font-bold"

                        >
                            Logout
                        </button>
                    </form>
                </div>
            ) : (
    <div className="flex flex-col justify-center items-center min-h-screen w-full relative px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-[#fff7ef]/90 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-2xl p-6 sm:p-8 md:p-10 lg:p-12 space-y-8 z-10">

                        <div className="flex flex-col items-center space-y-2">
                            <h1 className="text-2xl font-bold text-[#5e3c1b]">Login</h1>
                        </div>

                        <form className="space-y-4" action={login}>
                            <InputField
                                icon="📧"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                            />
                            <InputField
                                icon="🔒"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                            />

                            <button
                                type="submit"
                                className="w-full font-semibold py-2 rounded-lg transition bg-[#c27a44] hover:bg-[#a86438] text-white"
                            >
                                Submit
                            </button>

                            {message && (
                                <div className="text-red-500 text-sm">
                                    {message}
                                </div>
                            )}

                            <div className="text-center">
                                <a href="/auth/register" className="text-sm text-[#a05a2c] hover:underline">
                                    Create an account?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Page
