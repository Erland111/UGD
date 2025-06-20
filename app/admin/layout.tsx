'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { FiChevronDown, FiLogOut } from 'react-icons/fi';
import '../globals.css';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Proteksi Admin, ambil user dari localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const u = localStorage.getItem('loggedInUser');
      if (u) {
        const parsed = JSON.parse(u);
        setUser(parsed);
        if (parsed.role !== 'admin') {
          router.replace('/user');
        }
      } else {
        router.replace('/login');
      }
    }
  }, [router]);

  // Close dropdown jika klik di luar profile box
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileOpen]);

  function handleLogout() {
    localStorage.removeItem('loggedInUser');
    router.push('/login');
  }

  return (
    <div className="flex h-screen bg-zinc-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="group w-[72px] hover:w-64 transition-all duration-300 bg-zinc-950 border-r border-red-900 p-4 shadow-md overflow-hidden flex flex-col">
        <div>
          <h2 className="text-red-600 text-xl font-bold mb-6 tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            🎃 STECU
          </h2>
          <nav className="flex flex-col gap-4">
            <Link href="/admin/dashboard" className="flex items-center gap-3 text-white hover:text-red-400">
              <span className="text-lg">🏠</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Dashboard
              </span>
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 text-white hover:text-red-400">
              <span className="text-lg">🍽️</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Menu
              </span>
            </Link>
            <Link href="/admin/transactions" className="flex items-center gap-3 text-white hover:text-red-400">
              <span className="text-lg">💵</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Transaksi
              </span>
            </Link>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto relative">
        {/* --- PROFILE DROPDOWN di kanan atas --- */}
        <div className="absolute top-8 right-8 z-50" ref={profileRef}>
          {user && (
            <>
              <button
                className="flex items-center gap-2 rounded-full bg-zinc-800 px-3 py-1 shadow-lg hover:bg-zinc-700 transition group"
                onClick={() => setProfileOpen((v) => !v)}
              >
                <div className="w-9 h-9 rounded-full bg-gray-300 text-zinc-900 font-bold flex items-center justify-center text-lg border border-gray-400 select-none">
                  {getInitials(user.username || 'U')}
                </div>
                <FiChevronDown className="text-white text-lg group-hover:rotate-180 transition-transform" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-zinc-900 rounded-xl shadow-xl border px-4 py-4 flex flex-col gap-3 animate-fade-in">
                  <div>
                    <div className="font-bold text-base">{user.username}</div>
                    <div className="text-sm text-gray-500">{user.role}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full mt-2 bg-red-600 text-white px-3 py-2 rounded font-bold flex items-center gap-2 justify-center hover:bg-red-800"
                  >
                    <FiLogOut className="text-lg" />
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        {/* --- END PROFILE --- */}
        {children}
      </main>
    </div>
  );
}
