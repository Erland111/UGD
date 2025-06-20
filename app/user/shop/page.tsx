"use client";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
};

// Skeleton loading card
function ProductSkeleton() {
  return (
    <div className="bg-[#141417] rounded-xl shadow overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-800" />
      <div className="p-4">
        <div className="h-5 bg-gray-700 rounded mb-2 w-2/3" />
        <div className="h-3 bg-gray-700 rounded mb-2 w-1/2" />
        <div className="h-4 bg-gray-800 rounded w-1/3" />
      </div>
    </div>
  );
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  // Reset ke page 1 kalau list produk berubah (misal search nanti)
  useEffect(() => {
    setCurrentPage(1);
  }, [products.length]);

  // Logic pagination
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const pagedProducts = products.slice(startIdx, endIdx);

  // Pagination component
  function Pagination() {
    if (totalPages <= 1) return null;
    return (
      <div className="flex gap-2 justify-center my-8">
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
                ? "bg-red-700 text-white font-bold"
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
    <div>
      <h1 className="text-3xl font-bold text-center mb-8 text-red-400">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          // 6 skeleton cards
          Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
        ) : pagedProducts.length === 0 ? (
          <p className="col-span-3 text-center text-white">Tidak ada produk.</p>
        ) : (
          pagedProducts.map((p) => (
            <div
              key={p.id}
              className="bg-[#141417] rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="font-bold text-lg mb-1 text-yellow-300">{p.name}</h2>
                <p className="text-sm text-gray-300 mb-2">{p.description}</p>
                <p className="font-bold text-red-400 text-lg">
                  Rp {p.price.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Pagination muncul di bawah grid */}
      <Pagination />
    </div>
  );
}
