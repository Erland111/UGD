'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [pendapatanBulanan, setPendapatanBulanan] = useState([]);
  const [pendapatanHarian, setPendapatanHarian] = useState([]);
  const [totalMembers, setTotalMembers] = useState<number | null>(null);
  const [loadingPendapatan, setLoadingPendapatan] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(true);

  const router = useRouter();

  // Logout Handler
  function handleLogout() {
    // localStorage.removeItem('token'); // Kalau pakai token
    router.push('/login');
  }

  // Profil Handler
  function handleProfile() {
    router.push('/admin/profile'); // Pastikan halaman ini ada
  }

  // Fetch pendapatan
  useEffect(() => {
    async function fetchPendapatan() {
      setLoadingPendapatan(true);
      try {
        const res = await fetch('/api/pendapatan');
        const data = await res.json();
        setPendapatanBulanan(data.bulanan || []);
        setPendapatanHarian(data.harian || []);
      } catch (err) {
        setPendapatanBulanan([]);
        setPendapatanHarian([]);
      }
      setLoadingPendapatan(false);
    }
    fetchPendapatan();
  }, []);

  // Fetch total members
  useEffect(() => {
    async function fetchTotalMembers() {
      setLoadingMembers(true);
      try {
        const res = await fetch('/api/members/count');
        const data = await res.json();
        setTotalMembers(typeof data.count === "number" ? data.count : Number(data.count));
      } catch {
        setTotalMembers(null);
      }
      setLoadingMembers(false);
    }
    fetchTotalMembers();
  }, []);

  // SKELETON COMPONENTS
  function SkeletonBox() {
    return (
      <div className="bg-[#28282d] rounded-xl p-6 text-white animate-pulse flex flex-col gap-2">
        <div className="h-5 w-32 bg-gray-700 rounded mb-2" />
        <div className="h-8 w-1/2 bg-gray-700 rounded" />
      </div>
    );
  }
  function SkeletonChart() {
    return (
      <div className="w-full h-[250px] bg-gray-800 rounded-lg animate-pulse" />
    );
  }

  return (
    <div className="min-h-screen bg-[#202024] p-8 relative">
      {/* Tombol Profil Admin kanan atas */}
      <button
        onClick={handleProfile}
        className="absolute top-6 right-10 bg-zinc-700 hover:bg-zinc-500 text-white px-5 py-2 rounded-lg font-bold shadow z-20"
      >
        Profil Admin
      </button>

      {/* Tombol Logout kiri bawah */}
      

      <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>

      {/* Statistik Atas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {loadingMembers
          ? <SkeletonBox />
          : (
            <div className="bg-[#28282d] rounded-xl p-6 text-white">
              <div>Total Members</div>
              <div className="text-3xl font-bold mt-2">
                {totalMembers === null
                  ? <span className="animate-pulse text-gray-500">...</span>
                  : totalMembers}
              </div>
            </div>
          )}
        <div className="bg-[#28282d] rounded-xl p-6 text-white">
          <div>Outcome</div>
          <div className="text-3xl font-bold mt-2 text-red-400">Rp 2.328.007</div>
        </div>
        <div className="bg-[#28282d] rounded-xl p-6 text-white">
          <div>Income</div>
          <div className="text-3xl font-bold mt-2 text-green-400">Rp 13.280.007</div>
        </div>
        <div className="bg-[#28282d] rounded-xl p-6 text-white">
          <div>Total Transaksi</div>
          <div className="text-3xl font-bold mt-2">194</div>
        </div>
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#28282d] rounded-xl p-6 text-white">
          <div className="mb-2 font-bold">Pendapatan Harian</div>
          {loadingPendapatan
            ? <SkeletonChart />
            : (
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={pendapatanHarian}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hari" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#21D375" name="Pendapatan Harian" />
                </LineChart>
              </ResponsiveContainer>
            )}
        </div>

        <div className="bg-[#28282d] rounded-xl p-6 text-white">
          <div className="mb-2 font-bold">Pendapatan Bulanan</div>
          {loadingPendapatan
            ? <SkeletonChart />
            : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={pendapatanBulanan}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bulan" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#B30A0A" name="Pendapatan Bulanan" />
                </BarChart>
              </ResponsiveContainer>
            )}
        </div>
      </div>

      {/* Menu & Transaksi Best Seller */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#28282d] rounded-xl p-6 text-white">
          <div className="mb-2 font-bold">Menu Terbanyak Dipesan Hari Ini</div>
          <div className="text-lg mt-2">🍔 Burger Hantu</div>
        </div>
        <div className="bg-[#28282d] rounded-xl p-6 text-white">
          <div className="mb-2 font-bold">Transaksi Pelanggan Terbanyak Bulan Ini</div>
          <div className="text-lg mt-2">👻 David</div>
        </div>
      </div>
    </div>
  );
}
