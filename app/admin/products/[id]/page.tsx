"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "@/lib/action/products";

export default function ProductForm({ params }) {
  const router = useRouter();
  const isEdit = params.id !== "new";
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  // Fetch data saat edit
  useEffect(() => {
    if (isEdit) {
      fetch(`/api/products/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct({
            id: data?.id?.toString() || params.id, // fallback params.id
            name: data?.name ?? "",
            description: data?.description ?? "",
            price: data?.price?.toString() ?? "",
            image_url: data?.image_url ?? "",
          });
        });
    } else {
      setProduct({
        id: "",
        name: "",
        description: "",
        price: "",
        image_url: "",
      });
    }
  }, [isEdit, params.id]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Jaga-jaga, append id kalau belum ada
    if (isEdit && !formData.get("id")) {
      formData.append("id", product.id || params.id);
    }

    if (isEdit) {
      await updateProduct(formData);
    } else {
      await createProduct(formData);
    }
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-black text-white">
      <h1 className="text-2xl font-bold text-red-500 mb-4">
        {isEdit ? "Edit Produk" : "Tambah Produk"}
      </h1>
      {isEdit && ( // PENTING! input hidden ini harus ada
        <input type="hidden" name="id" value={product.id || params.id} />
      )}
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
