"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

// --- TIPE DATA ---
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  // Next.js App Router: params.id bisa string atau array
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    image_url: "",
  });
  const [image, setImage] = useState<string>("");

  // --- Ambil data produk lama ---
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setForm({
          name: data.name || "",
          description: data.description || "",
          price: data.price || 0,
          image_url: data.image_url || "",
        });
        setImage(data.image_url || "");
      }
      setLoading(false);
    }
    if (id) fetchProduct();
  }, [id]);

  // --- File ke Base64 ---
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  }

  // --- Submit update produk ---
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      price: Number(form.price) || 0,
      image_url: image, // base64
    };
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      alert("Berhasil update produk!");
      router.push("/admin/products");
    } else {
      alert("Gagal update produk!");
    }
  }

  // --- Render Form ---
  return (
    <div className="min-h-screen p-8 bg-black text-white">
      <h1 className="text-3xl font-bold text-red-400 mb-6">Edit Produk</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-xl bg-[#18181c] rounded-lg p-6 space-y-5"
        >
          <div>
            <label className="font-semibold block mb-1">Nama Produk</label>
            <input
              className="w-full p-2 rounded bg-[#232329] text-white mb-2"
              value={form.name ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Deskripsi</label>
            <textarea
              className="w-full p-2 rounded bg-[#232329] text-white mb-2"
              value={form.description ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              rows={3}
              required
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Harga</label>
            <input
              className="w-full p-2 rounded bg-[#232329] text-white mb-2"
              type="number"
              value={form.price ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, price: Number(e.target.value) }))
              }
              min={0}
              required
            />
          </div>
          <div>
            <label className="font-semibold block mb-1">Gambar Produk</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-2"
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="w-32 h-32 rounded mb-2 object-cover border"
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-bold"
            disabled={saving}
          >
            {saving ? "Menyimpan..." : "Simpan"}
          </button>
        </form>
      )}
    </div>
  );
}
