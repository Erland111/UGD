"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Tipe produk
type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string | null;
};

// Ambil data produk dari API
async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("/api/products");
  if (!res.ok) return [];
  return res.json();
}

// Hapus produk (cukup method DELETE, id di URL)
async function deleteProduct(id: number) {
  const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
  return res.ok;
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-[#232329]">
      <td className="py-3 px-4 text-center align-middle">
        <div className="h-20 w-20 mx-auto bg-gray-700 rounded" />
      </td>
      <td className="py-3 px-4 text-center align-middle">
        <div className="h-6 w-32 bg-gray-700 rounded mx-auto mb-1" />
      </td>
      <td className="py-3 px-4 text-center align-middle">
        <div className="h-6 w-24 bg-gray-700 rounded mx-auto" />
      </td>
      <td className="py-3 px-4 text-center align-middle">
        <div className="h-8 w-20 bg-gray-700 rounded mx-auto" />
      </td>
    </tr>
  );
}

export default function AdminProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const pagedProducts = filtered.slice(startIdx, endIdx);

  // Reset ke page 1 kalau search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  async function handleDelete(id: number) {
    if (confirm("Hapus produk ini?")) {
      const ok = await deleteProduct(id);
      if (ok) setProducts((prev) => prev.filter((p) => p.id !== id));
      else alert("Gagal menghapus produk!");
    }
  }

  function Pagination() {
    if (totalPages <= 1) return null;
    return (
      <div className="flex gap-2 justify-center my-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-red-700 text-white"
                : "bg-gray-700 text-white"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-black">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Daftar Menu</h1>
      <div className="flex items-center mb-4 gap-2">
        <input
          className="px-3 py-2 rounded bg-[#232329] text-white border border-gray-600 outline-none"
          placeholder="Cari menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ minWidth: 220 }}
        />
        <Link
          href="/admin/products/new"
          className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded ml-auto"
        >
          + Tambah Produk
        </Link>
      </div>
      <div className="overflow-x-auto rounded">
        <table className="w-[98%] mx-auto rounded-xl overflow-hidden mt-2">
          <thead>
            <tr className="bg-[#6c3129] text-white">
              <th className="py-3 px-4 text-center font-bold">Foto</th>
              <th className="py-3 px-4 text-center font-bold">Nama</th>
              <th className="py-3 px-4 text-center font-bold">Harga</th>
              <th className="py-3 px-4 text-center font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-black">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : pagedProducts.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-white">
                  Tidak ada produk.
                </td>
              </tr>
            ) : (
              pagedProducts.map((p) => (
                <tr key={p.id} className="border-b border-[#232329]">
                  <td className="py-3 px-4 text-center align-middle">
                    {p.image_url && (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="h-20 w-20 mx-auto object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center align-middle">{p.name}</td>
                  <td className="py-3 px-4 text-center align-middle">
                    Rp {p.price.toLocaleString("id-ID")}
                  </td>
                  <td className="py-3 px-4 text-center align-middle">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-1 rounded font-bold transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
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
      <Pagination />
    </div>
  );
}
