'use client';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line
} from 'recharts';

const pendapatanBulanan = [
  { bulan: 'Jan', total: 0 },
  { bulan: 'Feb', total: 0 },
  { bulan: 'Mar', total: 120_000 },
  { bulan: 'Apr', total: 200_000 },
  { bulan: 'Mei', total: 0 },
  { bulan: 'Jun', total: 0 },
  { bulan: 'Jul', total: 0 },
  { bulan: 'Agu', total: 0 },
  { bulan: 'Sep', total: 0 },
  { bulan: 'Okt', total: 0 },
  { bulan: 'Nov', total: 0 },
  { bulan: 'Des', total: 0 },
];

const pendapatanHarian = [
  { hari: 'Senin', total: 0 },
  { hari: 'Selasa', total: 0 },
  { hari: 'Rabu', total: 0 },
  { hari: 'Kamis', total: 0 },
  { hari: 'Jumat', total: 0 },
  { hari: 'Sabtu', total: 0 },
  { hari: 'Minggu', total: 0 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#202024] p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>
      {/* Kartu atas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#28282d] rounded-xl p-6 text-white">
          <div>Total Members</div>
          <div className="text-3xl font-bold mt-2">4</div>
        </div>
        <div className="bg-[#28282d] rounded-xl p-6 text-white">
          <div>Outcome</div>
          <div className="text-3xl font-bold mt-2 text-red-400">Rp 2.328.007,00</div>
        </div>
        <div className="bg-[#28282d] rounded-xl p-6 text-white">
          <div>Income</div>
          <div className="text-3xl font-bold mt-2 text-green-400">Rp 13.280.007,00</div>
        </div>
        <div className="bg-[#28282d] rounded-xl p-6 text-white">
          <div>Total Transaksi</div>
          <div className="text-3xl font-bold mt-2">194</div>
        </div>
      </div>
      {/* Grafik */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Pendapatan Harian */}
        <div className="bg-[#28282d] rounded-xl p-6 text-white">
          <div className="mb-2 font-bold">Pendapatan Harian</div>
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
        </div>
        {/* Pendapatan Bulanan */}
        <div className="bg-[#28282d] rounded-xl p-6 text-white">
          <div className="mb-2 font-bold">Pendapatan Bulanan</div>
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
        </div>
      </div>
      {/* Bawah: Contoh menu terlaris dan pelanggan terbanyak */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#28282d] rounded-xl p-6 text-white">
          <div className="mb-2 font-bold">Menu Terbanyak Dipesan Hari Ini</div>
          <div className="text-lg mt-2">Burger Hantu</div>
        </div>
        <div className="bg-[#28282d] rounded-xl p-6 text-white">
          <div className="mb-2 font-bold">Transaksi Pelanggan Terbanyak Bulan Ini</div>
          <div className="text-lg mt-2">David Nureroan</div>
        </div>
      </div>
    </div>
  );
}
