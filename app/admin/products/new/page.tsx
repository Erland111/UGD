"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(""); // base64
  const [loading, setLoading] = useState(false);

  // convert file ke base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Cek validasi
    if (!name || !desc || !price || !image) {
      alert("Isi semua kolom & upload gambar!");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description: desc,
        price: Number(price),
        image_url: image,
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/products"); // Redirect biar data baru di-fetch ulang
    } else {
      alert("Gagal menambah produk!");
    }
  };

  return (
    <div className="p-8 min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold text-red-400 mb-6">Tambah Produk</h1>
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <label className="block mb-2">Nama Produk</label>
        <input className="w-full bg-[#232733] p-4 mb-4 rounded text-white"
          value={name} onChange={e => setName(e.target.value)}
        />
        <label className="block mb-2">Deskripsi</label>
        <input className="w-full bg-[#232733] p-4 mb-4 rounded text-white"
          value={desc} onChange={e => setDesc(e.target.value)}
        />
        <label className="block mb-2">Harga</label>
        <input className="w-full bg-[#232733] p-4 mb-4 rounded text-white"
          value={price} type="number"
          onChange={e => setPrice(e.target.value)}
        />
        <label className="block mb-2">Gambar Produk</label>
        <input type="file" accept="image/*"
          className="mb-4 bg-black" onChange={handleFileChange}
        />
        {image && (
          <img src={image} alt="Preview" className="h-32 my-2 rounded shadow" />
        )}
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-900 px-6 py-3 rounded text-lg font-bold"
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
