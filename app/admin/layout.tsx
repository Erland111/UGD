// app/admin/layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import '@/app/globals.css'; // Pastikan ini ada

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-zinc-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-red-900 p-6 space-y-4 shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-6 tracking-wide">🧛‍♂️ STECU</h2>

        <nav className="flex flex-col gap-4">
          <Link href="/admin/dashboard" className="hover:text-red-400">📊 Dashboard</Link>
          <Link href="/admin/products" className="hover:text-red-400">🍔 Menu</Link>
          <Link href="/admin/transactions" className="hover:text-red-400">💰 Penjualan</Link>
          <Link href="/admin/purchases" className="hover:text-red-400">📦 Pembelian</Link>
          <Link href="/admin/customers" className="hover:text-red-400">🧍‍♂️ Pelanggan</Link>
          <Link href="/admin/members" className="hover:text-red-400">🎖️ Member</Link>
          <Link href="/admin/ingredients" className="hover:text-red-400">🧄 Bahan Baku</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
