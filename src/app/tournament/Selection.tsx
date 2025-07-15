'use client';

import Link from 'next/link';
import {
  Gamepad2,
  Sword,
  Dribbble,
  Circle,
  Feather,
  Activity,
} from 'lucide-react';

const sports = [
  { name: 'Football', icon: <Circle className="w-5 h-5 text-blue-500" />, href: '/tournament/football' },
  { name: 'Basketball', icon: <Dribbble className="w-5 h-5 text-blue-500" />, href: '/tournament/basketball' },
  { name: 'Badminton', icon: <Feather className="w-5 h-5 text-blue-500" />, href: '/tournament/badminton' },
  { name: 'Running', icon: <Activity className="w-5 h-5 text-blue-500" />, href: '/tournament/running' },
];

const esports = [
  { name: 'RoV', icon: <Sword className="w-5 h-5 text-pink-500" />, href: '/tournament/rov' },
  { name: 'Valorant', icon: <Gamepad2 className="w-5 h-5 text-pink-500" />, href: '/tournament/valorant' },
];

export default function Selection() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-4xl w-full">
        <h1 className="text-center text-4xl font-semibold text-gray-800 mb-12">ดูตารางการแข่งขัน</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sports */}
          <section className="rounded-xl border border-blue-100 bg-white shadow-sm p-6 hover:shadow-md transition">
            <h2 className="text-xl font-medium text-blue-600 mb-4 flex items-center gap-2">
              <Circle className="w-5 h-5" />
              Sports
            </h2>
            <div className="space-y-2">
              {sports.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-50 transition"
                >
                  {item.icon}
                  <span className="text-gray-700">{item.name}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* eSports */}
          <section className="rounded-xl border border-pink-100 bg-white shadow-sm p-6 hover:shadow-md transition">
            <h2 className="text-xl font-medium text-pink-600 mb-4 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              eSports
            </h2>
            <div className="space-y-2">
              {esports.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-md hover:bg-pink-50 transition"
                >
                  {item.icon}
                  <span className="text-gray-700">{item.name}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
