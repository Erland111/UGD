'use client';

import { useState } from 'react';

// ==================
// 1. Types/interfaces
// ==================
type Produk = {
  id_produk: string;
  nama_produk: string;
  qty: number;
};

type Transaksi = {
  id: number;
  tanggal: string;
  total: number;
  user: string;
  produk: Produk[];
};

// ==================
// 2. Dummy Data
// ==================
const allTransactions: Transaksi[] = [
  {
    id: 1,
    tanggal: '2024-12-09 08:43:32',
    total: 60000,
    user: 'Grace',
    produk: [
      { id_produk: 'P001', nama_produk: 'Mie Ayam', qty: 3 },
      { id_produk: 'P002', nama_produk: 'Telur Balado', qty: 2 },
    ]
  },
  {
    id: 2,
    tanggal: '2024-12-09 08:43:32',
    total: 22000,
    user: 'Hannah',
    produk: [
      { id_produk: 'P003', nama_produk: 'Terong Goreng', qty: 2 },
    ]
  },
  {
    id: 3,
    tanggal: '2024-12-09 08:43:32',
    total: 120000,
    user: 'Grace',
    produk: [
      { id_produk: 'P004', nama_produk: 'Kwetiaw Goreng', qty: 2 },
      { id_produk: 'P005', nama_produk: 'Mie Goreng', qty: 2 },
      { id_produk: 'P001', nama_produk: 'Mie Ayam', qty: 5 },
    ]
  },
  {
    id: 4,
    tanggal: '2024-12-09 08:43:32',
    total: 36000,
    user: 'David',
    produk: [
      { id_produk: 'P001', nama_produk: 'Mie Ayam', qty: 3 }
    ]
  },
  {
    id: 5,
    tanggal: '2024-12-09 08:43:32',
    total: 260000,
    user: 'Charlie',
    produk: [
      { id_produk: 'P006', nama_produk: 'Bakso Kuah', qty: 4 },
      { id_produk: 'P007', nama_produk: 'Sate Ayam', qty: 4 },
      { id_produk: 'P007', nama_produk: 'Sate Ayam', qty: 2 },
    ]
  },
];

function formatRupiah(num: number) {
  return "Rp" + num.toLocaleString('id-ID');
}

// ==================
// 3. Main Component
// ==================
export default function TransactionsPage() {
  const [search, setSearch] = useState<string>('');
  const [show, setShow] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  // Filter transaksi berdasarkan nama user atau produk
  const filtered = allTransactions.filter(trx => {
    const namaProduk = trx.produk.map((p) => p.nama_produk).join(' ').toLowerCase();
    return (
      trx.user.toLowerCase().includes(search.toLowerCase()) ||
      namaProduk.includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filtered.length / show);

  const paginated = filtered.slice((page - 1) * show, page * show);

  // Handle next, prev
  function gotoPage(p: number) {
    if (p >= 1 && p <= totalPages) setPage(p);
  }

  return (
    <div className="p-6 min-h-screen bg-[#19191c] text-white">
      <h1 className="text-4xl font-bold text-red-600 mb-6">🧛 Penjualan</h1>
      <div className="flex flex-wrap items-center mb-4 gap-2">
        <label className="text-yellow-400 mr-2">Show:</label>
        <select
          className="rounded px-2 py-1 bg-[#232329] text-white border border-gray-600"
          value={show}
          onChange={e => { setShow(Number(e.target.value)); setPage(1); }}
        >
          {[5, 10, 20, 50].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <input
          type="text"
          className="ml-auto rounded px-2 py-1 bg-[#232329] border border-gray-600"
          placeholder="Cari..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          style={{ minWidth: 200 }}
        />
      </div>

      <div className="bg-[#141417] rounded-xl overflow-hidden shadow-lg">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#701a18] text-white">
              <th className="py-2 px-4">ID Transaksi</th>
              <th className="py-2 px-4">Tanggal Transaksi</th>
              <th className="py-2 px-4">Total Harga</th>
              <th className="py-2 px-4">Nama Pembeli</th>
              <th className="py-2 px-4">ID Produk</th>
              <th className="py-2 px-4">Produk (Qty)</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">Tidak ada data transaksi.</td>
              </tr>
            ) : paginated.map(trx => (
              <tr key={trx.id} className="border-b border-[#222] hover:bg-[#251f1e] transition">
                <td className="py-2 px-4 text-center">{trx.id}</td>
                <td className="py-2 px-4 text-center">{trx.tanggal}</td>
                <td className="py-2 px-4 text-center">{formatRupiah(trx.total)}</td>
                <td className="py-2 px-4 text-center">{trx.user}</td>
                <td className="py-2 px-4 text-center">
                  {trx.produk.map((p, i) => (
                    <div key={p.id_produk + i}>{p.id_produk}</div>
                  ))}
                </td>
                <td className="py-2 px-4">
                  {trx.produk.map((p, i) => (
                    <div key={p.id_produk + '-' + i}>
                      <span className="font-bold">{p.nama_produk}</span>
                      <span className="ml-2 text-sm text-gray-400">x{p.qty}</span>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-400">
          Showing {filtered.length === 0 ? 0 : (page - 1) * show + 1}
          {' '}
          to {Math.min(page * show, filtered.length)} of {filtered.length} results
        </span>
        <div className="flex gap-1">
          <button onClick={() => gotoPage(page - 1)} disabled={page === 1}
            className="rounded px-2 py-1 bg-[#232329] text-white disabled:opacity-50">
            {'<'}
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => gotoPage(i + 1)}
              className={`rounded px-3 py-1 mx-0.5 ${page === i + 1 ? 'bg-red-600' : 'bg-[#232329]'} text-white`}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => gotoPage(page + 1)} disabled={page === totalPages}
            className="rounded px-2 py-1 bg-[#232329] text-white disabled:opacity-50">
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}
