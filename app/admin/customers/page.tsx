// app/admin/customers/page.tsx

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCustomers, saveCustomers, Customer } from "./customers-storage";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    setCustomers(getCustomers());
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("Yakin hapus pelanggan?")) return;
    const newCustomers = customers.filter(c => c.id !== id);
    setCustomers(newCustomers);
    saveCustomers(newCustomers);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-red-600 mb-4">👻 Daftar Pelanggan</h1>
      <Link href="/admin/customers/add">
        <button className="bg-red-600 text-white rounded px-4 py-2 mb-4 hover:bg-red-700">+ Tambah Pelanggan</button>
      </Link>
      <table className="w-full bg-black text-white rounded">
        <thead>
          <tr className="bg-red-900">
            <th>Nama</th>
            <th>Social Media</th>
            <th>Progress Transaksi</th>
            <th>Member</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-300">Tidak ada pelanggan.</td>
            </tr>
          ) : customers.map((c) => (
            <tr key={c.id} className="hover:bg-gray-800 transition">
              <td>
                <Link href={`/admin/customers/${c.id}/detail`} className="text-blue-400 hover:underline">{c.name}</Link>
              </td>
              <td>{c.social}</td>
              <td>{c.progress}</td>
              <td>{c.member}</td>
              <td>{c.status}</td>
              <td>
                <Link href={`/admin/customers/${c.id}/edit`}>
                  <button className="bg-yellow-400 text-black px-2 rounded mr-2">Edit</button>
                </Link>
                <button className="bg-red-600 text-white px-2 rounded" onClick={() => handleDelete(c.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
