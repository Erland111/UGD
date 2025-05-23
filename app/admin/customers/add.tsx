// app/admin/customers/add.tsx

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCustomers, saveCustomers, generateId } from "./customers-storage";

export default function AddCustomerPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", social: "", progress: "", member: "", status: "Aktif" });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!form.name || !form.social) return alert("Isi nama & sosial media!");
    const customers = getCustomers();
    customers.push({
      id: generateId(),
      name: form.name,
      social: form.social,
      progress: Number(form.progress),
      member: form.member,
      status: form.status,
    });
    saveCustomers(customers);
    router.push("/admin/customers");
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Tambah Pelanggan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 rounded" placeholder="Nama Pelanggan" />
        <input name="social" value={form.social} onChange={handleChange} className="w-full p-2 rounded" placeholder="Social Media" />
        <input name="progress" value={form.progress} onChange={handleChange} className="w-full p-2 rounded" placeholder="Progress Transaksi" />
        <select name="member" value={form.member} onChange={handleChange} className="w-full p-2 rounded">
          <option value="">Pilih Member</option>
          <option>Non Member</option>
          <option>Standard</option>
          <option>VIP</option>
          <option>Prioritas</option>
          <option>diamond</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 rounded">
          <option>Aktif</option>
          <option>Tidak Aktif</option>
        </select>
        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-black text-white p-2 rounded">Simpan</button>
          <button type="button" className="flex-1 bg-red-600 text-white p-2 rounded" onClick={() => router.push("/admin/customers")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
