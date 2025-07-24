import React from 'react'
import { login, logout } from '../actions'
import { createClient } from '@/utils/supabase/server'
import InputField from '@/app/components/InputField'

async function Page({ searchParams }: { searchParams: { message: string } }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const message = (await searchParams).message;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br">
            {user ? (
                <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center space-y-4">
                    <h2 className="text-2xl font-bold text-[#5e3c1b]">You're already logged in</h2>
                    <p className="text-[#8b5e3c]">{user.email}</p>
                    <form action={logout}>
                        <button
                            type="submit"
                            className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                        >
                            Logout
                        </button>
                    </form>
                </div>
            ) : (
                // <form
                //   action={login}
                //   className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
                // >
                //   <h2 className="text-2xl font-bold text-center text-[#5e3c1b]">Login</h2>
                //   <div className="space-y-4">
                //     <div>
                //       <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                //         Email
                //       </label>
                //       <input
                //         type="email"
                //         name="email"
                //         id="email"
                //         required
                //         placeholder="Enter your email"
                //         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#c27a44] focus:border-[#c27a44]"
                //       />
                //     </div>
                //     <div>
                //       <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                //         Password
                //       </label>
                //       <input
                //         type="password"
                //         name="password"
                //         id="password"
                //         required
                //         placeholder="Enter your password"
                //         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#c27a44] focus:border-[#c27a44]"
                //       />
                //     </div>
                //   </div>

                //   <button
                //     type="submit"
                //     className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#c27a44] hover:bg-[#a86438] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c27a44]"
                //   >
                //     Sign in
                //   </button>

                //   <div className="text-center">
                //     <a href="#" className="text-sm text-[#a05a2c] hover:underline">
                //       Forgot password?
                //     </a>
                //   </div>
                // </form>
                <div className="flex flex-col items-center justify-center px-4">
                    <div className="bg-[#fff7ef] rounded-2xl shadow-lg w-full max-w-sm p-8 space-y-6">

                        <div className="flex flex-col items-center space-y-2">
                            <h1 className="text-2xl font-bold text-[#5e3c1b]">Login</h1>
                        </div>

                        <form className="space-y-4" action={login}>
                            {/* <InputField
                                icon="👤"
                                type="text"
                                name="nickname"
                                id="nickname"
                                placeholder="Enter your Nickname"
                                required
                            /> */}
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
