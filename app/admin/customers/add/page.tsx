"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCustomerPage() {
  const [form, setForm] = useState({ name: "", social: "", progress: "", member: "", status: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/customers", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        progress: Number(form.progress) || 0,
      }),
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin/customers");
    } else {
      alert("Gagal tambah data!");
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8 bg-[#141417] p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Tambah Pelanggan</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input required className="input" placeholder="Nama" value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <input required className="input" placeholder="No. HP" value={form.social}
          onChange={e => setForm(f => ({ ...f, social: e.target.value }))} />
        <input className="input" placeholder="Saldo" type="number" value={form.progress}
          onChange={e => setForm(f => ({ ...f, progress: e.target.value }))} />
        <input className="input" placeholder="Member (Gold/Diamond/Silver)" value={form.member}
          onChange={e => setForm(f => ({ ...f, member: e.target.value }))} />
        <input className="input" placeholder="Status (Aktif/Nonaktif)" value={form.status}
          onChange={e => setForm(f => ({ ...f, status: e.target.value }))} />
        <button type="submit" disabled={loading} className="bg-red-600 text-white rounded p-2 font-bold">
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
