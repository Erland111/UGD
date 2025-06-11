// app/admin/layout.tsx

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiUser, FiLogOut } from 'react-icons/fi';
import '../globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  function handleLogout() {
    // Hapus session/localstorage kalau ada!
    // Contoh: localStorage.removeItem('token');
    router.push('/login');
  }

  return (
    <div className="flex h-screen bg-zinc-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="group w-[72px] hover:w-64 transition-all duration-300 bg-zinc-950 border-r border-red-900 p-4 shadow-md overflow-hidden flex flex-col justify-between">
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
            <Link href="/admin/customers" className="flex items-center gap-3 text-white hover:text-red-400">
              <span className="text-lg">👥</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Pelanggan
              </span>
            </Link>
          </nav>
        </div>
        {/* Profil & Logout di kiri bawah */}
        <div className="flex flex-col items-center gap-4 pb-4">
          {/* Profil Admin */}
          <div className="flex flex-col items-center">
            <FiUser className="text-2xl mb-1" />
            <span className="text-xs text-gray-300">Admin</span>
          </div>
          {/* Tombol Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-800 text-white px-3 py-2 rounded font-bold w-full justify-center mt-3"
          >
            <FiLogOut className="text-xl" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Logout
            </span>
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
