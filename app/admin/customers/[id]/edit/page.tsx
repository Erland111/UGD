"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditCustomerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [form, setForm] = useState({
    name: "",
    social: "",
    progress: "",
    member: "",
    status: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/customers/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.name ?? "",
          social: data.social ?? "",
          progress: String(data.progress ?? ""),
          member: data.member ?? "",
          status: data.status ?? ""
        });
        setLoading(false);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/customers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        progress: Number(form.progress) || 0,
      }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin/customers");
    } else {
      alert("Gagal update data!");
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-[#141417] p-6 rounded-xl">
      <h2 className="text-xl font-bold mb-4">Edit Pelanggan</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input required className="input" placeholder="Nama" value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <input required className="input" placeholder="No. HP" value={form.social}
          onChange={e => setForm(f => ({ ...f, social: e.target.value }))} />
        <input className="input" placeholder="Saldo" type="number" value={form.progress}
          onChange={e => setForm(f => ({ ...f, progress: e.target.value }))} />
        <input className="input" placeholder="Member" value={form.member}
          onChange={e => setForm(f => ({ ...f, member: e.target.value }))} />
        <input className="input" placeholder="Status" value={form.status}
          onChange={e => setForm(f => ({ ...f, status: e.target.value }))} />
        <button type="submit" className="bg-yellow-400 text-black rounded p-2 font-bold">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
