"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Customer = {
  id: number;
  name: string;
  social: string;
  progress: number;
  member: string;
  status: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    setLoading(true);
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }

  function formatRupiah(num: number) {
    return "Rp " + num.toLocaleString("id-ID");
  }

  const filtered = customers.filter((c) => {
    const val = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(val) ||
      c.social.toLowerCase().includes(val) ||
      c.member.toLowerCase().includes(val) ||
      c.status.toLowerCase().includes(val)
    );
  });

  async function handleDelete(id: number) {
    if (confirm("Hapus pelanggan ini?")) {
      const res = await fetch(`/api/customers/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCustomers((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("Gagal hapus data!");
      }
    }
  }

  return (
    <div className="p-6 min-h-screen bg-black">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Daftar Pelanggan</h1>

      <div className="flex items-center mb-4 gap-2">
        <input
          className="px-3 py-2 rounded bg-[#232329] text-white border border-gray-600 outline-none"
          placeholder="Cari pelanggan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ minWidth: 220 }}
        />
        <Link
          href="/admin/customers/add"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-auto"
        >
          Tambah Pelanggan
        </Link>
      </div>

      <div className="overflow-x-auto rounded">
        <table className="w-[95%] mx-auto bg-black rounded-xl overflow-hidden text-base">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-red-900 text-white font-bold text-center">Nama</th>
              <th className="py-2 px-4 bg-red-900 text-white font-bold text-center">No. HP</th>
              <th className="py-2 px-4 bg-red-900 text-white font-bold text-center">Saldo</th>
              <th className="py-2 px-4 bg-red-900 text-white font-bold text-center">Member</th>
              <th className="py-2 px-4 bg-red-900 text-white font-bold text-center">Status</th>
              <th className="py-2 px-4 bg-red-900 text-white font-bold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-400 bg-black">
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-400 bg-black">
                  Tidak ada data pelanggan.
                </td>
              </tr>
            ) : (
              filtered.map((cust) => (
                <tr key={cust.id} className="border-b border-gray-700 hover:bg-red-950 transition">
                  <td className="py-4 px-4 text-center align-middle">{cust.name}</td>
                  <td className="py-4 px-4 text-center align-middle">{cust.social}</td>
                  <td className="py-4 px-4 text-center align-middle">{formatRupiah(cust.progress)}</td>
                  <td className="py-4 px-4 text-center align-middle">{cust.member}</td>
                  <td className="py-4 px-4 text-center align-middle">{cust.status}</td>
                  <td className="py-4 px-4 text-center align-middle">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/customers/${cust.id}/edit`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 rounded font-bold transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(cust.id)}
                        className="bg-red-600 hover:bg-red-800 text-white px-4 py-1 rounded font-bold transition"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
