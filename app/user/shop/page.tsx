// app/user/shop/page.tsx
"use client";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8 text-red-400">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p>Memuat data...</p>
        ) : products.length === 0 ? (
          <p>Tidak ada produk.</p>
        ) : (
          products.map((p) => (
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
    </div>
  );
}
