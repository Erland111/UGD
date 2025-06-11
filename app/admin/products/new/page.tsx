"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProduct } from "@/lib/action/products";

export default function ProductAddPage() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createProduct(formData);
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-black text-white">
      <h1 className="text-2xl font-bold text-red-500 mb-4">
        Tambah Produk
      </h1>
      <label className="block mb-2">Nama Produk</label>
      <input
        name="name"
        value={product.name}
        onChange={handleInputChange}
        className="mb-4 p-2 w-full bg-gray-800 border border-gray-600 rounded"
        required
      />
      <label className="block mb-2">Deskripsi</label>
      <input
        name="description"
        value={product.description}
        onChange={handleInputChange}
        className="mb-4 p-2 w-full bg-gray-800 border border-gray-600 rounded"
        required
      />
      <label className="block mb-2">Harga</label>
      <input
        name="price"
        type="number"
        value={product.price}
        onChange={handleInputChange}
        className="mb-4 p-2 w-full bg-gray-800 border border-gray-600 rounded"
        required
      />
      <label className="block mb-2">Gambar URL</label>
      <input
        name="image_url"
        value={product.image_url}
        onChange={handleInputChange}
        className="mb-6 p-2 w-full bg-gray-800 border border-gray-600 rounded"
        required
      />
      <button
        type="submit"
        className="bg-green-700 px-4 py-2 rounded hover:bg-green-600 font-bold"
      >
        Simpan
      </button>
    </form>
  );
}
