'use client';

import { useState } from 'react';

// Dummy data awal
const dummySales = [
  {
    id: 1,
    tanggal: '2024-05-17',
    produk: 'Pumpkin Cookies',
    jumlah: 3,
    total: 45000,
  },
  {
    id: 2,
    tanggal: '2024-05-18',
    produk: 'Spooky Donuts',
    jumlah: 2,
    total: 30000,
  },
];

const produkList = [
  { name: 'Pumpkin Cookies', price: 15000 },
  { name: 'Spooky Donuts', price: 15000 },
  { name: 'Mummy Sausage', price: 18000 },
];

export default function TransactionsPage() {
  const [data, setData] = useState(dummySales);
  const [showAdd, setShowAdd] = useState(false);
  const [showDetail, setShowDetail] = useState<{open: boolean, trx?: any}>({open: false});
  const [form, setForm] = useState({ tanggal: '', produk: produkList[0].name, jumlah: 1 });

  // Simpan penjualan baru
  function handleAdd() {
    const produkData = produkList.find((p) => p.name === form.produk);
    if (!produkData) return;
    const total = produkData.price * form.jumlah;
    setData([
      ...data,
      {
        id: Math.max(0, ...data.map(d => d.id)) + 1,
        tanggal: form.tanggal,
        produk: form.produk,
        jumlah: form.jumlah,
        total,
      },
    ]);
    setForm({ tanggal: '', produk: produkList[0].name, jumlah: 1 });
    setShowAdd(false);
  }

  // Hapus penjualan
  function handleDelete(id: number) {
    setData(data.filter((trx) => trx.id !== id));
  }

  // Detail modal
  function handleDetail(trx: any) {
    setShowDetail({ open: true, trx });
  }

  return (
    <div className="p-6 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-red-600 flex items-center gap-2">
        🧾 Daftar Penjualan STECU
      </h1>
      <button onClick={() => setShowAdd(true)} className="bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2 mb-4 font-bold">
        + Tambah Penjualan
      </button>
      <div className="overflow-x-auto">
        <table className="w-full bg-slate-900 rounded-xl shadow-lg">
          <thead>
            <tr className="bg-slate-800">
              <th className="p-3">Tanggal</th>
              <th className="p-3">Nama Produk</th>
              <th className="p-3">Jumlah</th>
              <th className="p-3">Total Harga</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((trx) => (
              <tr key={trx.id} className="border-b border-slate-700 hover:bg-slate-800">
                <td className="p-3">{trx.tanggal}</td>
                <td className="p-3">{trx.produk}</td>
                <td className="p-3">{trx.jumlah}</td>
                <td className="p-3">Rp {trx.total.toLocaleString()}</td>
                <td className="p-3 space-x-2">
                  <button className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700" onClick={() => handleDetail(trx)}>
                    Detail
                  </button>
                  <button className="bg-red-600 px-3 py-1 rounded hover:bg-red-700" onClick={() => handleDelete(trx.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-6 text-slate-400">
                  Tidak ada data penjualan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah */}
      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-slate-800 rounded-xl p-8 min-w-[320px]">
            <h2 className="text-xl font-bold mb-4">Tambah Penjualan</h2>
            <div className="mb-2">
              <label className="block mb-1">Tanggal</label>
              <input
                type="date"
                value={form.tanggal}
                onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                className="w-full rounded px-2 py-1 text-black"
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Produk</label>
              <select
                value={form.produk}
                onChange={(e) => setForm({ ...form, produk: e.target.value })}
                className="w-full rounded px-2 py-1 text-black"
              >
                {produkList.map((p) => (
                  <option key={p.name} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Jumlah</label>
              <input
                type="number"
                min={1}
                value={form.jumlah}
                onChange={(e) => setForm({ ...form, jumlah: Number(e.target.value) })}
                className="w-full rounded px-2 py-1 text-black"
              />
            </div>
            <div className="flex gap-3">
              <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 font-bold" onClick={handleAdd}>
                Simpan
              </button>
              <button className="bg-gray-400 px-4 py-2 rounded font-bold" onClick={() => setShowAdd(false)}>
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail */}
      {showDetail.open && showDetail.trx && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-slate-800 rounded-xl p-8 min-w-[320px]">
            <h2 className="text-xl font-bold mb-4">Detail Penjualan</h2>
            <div className="mb-2">Tanggal: <span className="font-bold">{showDetail.trx.tanggal}</span></div>
            <div className="mb-2">Produk: <span className="font-bold">{showDetail.trx.produk}</span></div>
            <div className="mb-2">Jumlah: <span className="font-bold">{showDetail.trx.jumlah}</span></div>
            <div className="mb-2">Total Harga: <span className="font-bold">Rp {showDetail.trx.total.toLocaleString()}</span></div>
            <button className="mt-4 bg-gray-400 px-4 py-2 rounded font-bold" onClick={() => setShowDetail({open:false})}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
