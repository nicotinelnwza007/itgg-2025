import React from 'react'
import { logout } from '../auth/actions'

function AdminPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Admin Page</h1>
        <p className="text-gray-500">Welcome to the admin page</p>
        <button onClick={logout} className="bg-blue-500 text-white px-4 py-2 rounded-md">Logout</button>
    </div>
  )
}

export default AdminPage