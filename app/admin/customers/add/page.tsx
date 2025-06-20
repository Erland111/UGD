"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCustomerPage() {
  const [form, setForm] = useState({
    name: "",
    social: "",
    progress: "",
    member: "",
    status: ""
  });
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        progress: Number(form.progress) || 0,
      }),
    });
    if (res.ok) {
      router.push("/admin/customers");
    } else {
      alert("Gagal tambah data!");
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-8 bg-[#141417] p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-red-400">Tambah Pelanggan</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          required
          className="input px-4 py-2 rounded border bg-zinc-800 text-white"
          placeholder="Nama"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
        <input
          required
          className="input px-4 py-2 rounded border bg-zinc-800 text-white"
          placeholder="No. HP"
          value={form.social}
          onChange={e => setForm(f => ({ ...f, social: e.target.value }))}
        />
        <input
          className="input px-4 py-2 rounded border bg-zinc-800 text-white"
          placeholder="Saldo"
          type="number"
          value={form.progress}
          onChange={e => setForm(f => ({ ...f, progress: e.target.value }))}
        />
        <input
          className="input px-4 py-2 rounded border bg-zinc-800 text-white"
          placeholder="Member"
          value={form.member}
          onChange={e => setForm(f => ({ ...f, member: e.target.value }))}
        />
        <input
          className="input px-4 py-2 rounded border bg-zinc-800 text-white"
          placeholder="Status"
          value={form.status}
          onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded mt-2"
        >
          Simpan Pelanggan
        </button>
      </form>
    </div>
  );
}
