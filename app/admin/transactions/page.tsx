'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  image_url: string;
  price: number;
};

type SaleItem = {
  product_id: number | string;
  name?: string;
  image_url?: string;
  price: number;
  quantity: number;
};

type Sale = {
  id: number;
  customer_name: string;
  date: string | null;
  total: number;
  items?: SaleItem[];
};

function SkeletonRow() {
  return (
    <tr className="border-b border-[#232329] animate-pulse">
      <td className="py-6 px-4 text-center">
        <div className="h-5 w-20 mx-auto bg-gray-700 rounded" />
      </td>
      <td className="py-6 px-4 text-center">
        <div className="h-5 w-24 mx-auto bg-gray-700 rounded" />
      </td>
      <td className="py-6 px-4 text-center">
        <div className="flex flex-col gap-2 items-center">
          <div className="h-16 w-16 bg-gray-700 rounded" />
          <div className="h-5 w-28 bg-gray-700 rounded" />
        </div>
      </td>
      <td className="py-6 px-4 text-center">
        <div className="h-5 w-24 mx-auto bg-gray-700 rounded" />
      </td>
      <td className="py-6 px-4 text-center">
        <div className="h-10 w-20 mx-auto bg-gray-700 rounded" />
      </td>
    </tr>
  );
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [addData, setAddData] = useState({
    customer_name: '',
    date: '',
    items: [{ product_id: '', quantity: 1, price: 0 }],
  });
  const [editTrx, setEditTrx] = useState<Sale | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch('/api/sales');
      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    }
    fetchProducts();
  }, []);

  // === Helper untuk ambil harga otomatis saat pilih produk ===
  const updateAddItem = (idx: number, field: string, value: string | number) =>
    setAddData((d) => {
      let updated = d.items.map((item, i) => {
        if (i !== idx) return item;
        // Otomatis update harga dari produk jika ganti produk
        if (field === 'product_id') {
          const selected = products.find((p) => p.id === Number(value));
          return {
            ...item,
            product_id: value,
            price: selected ? selected.price : 0,
          };
        }
        return { ...item, [field]: value };
      });
      return { ...d, items: updated };
    });

  // Untuk edit modal juga bisa sama (opsional, kalau mau edit harga juga otomatis)

  const filteredTransactions = transactions.filter(
    (trx) =>
      trx.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      trx.items?.some((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      )
  );

  const formatTanggal = (tgl: string | null) => {
    if (!tgl) return '-';
    if (tgl.includes('T')) return tgl.split('T')[0];
    return tgl;
  };

  const addItemRow = () =>
    setAddData((d) => ({
      ...d,
      items: [...d.items, { product_id: '', quantity: 1, price: 0 }],
    }));

  const removeItemRow = (idx: number) =>
    setAddData((d) => ({
      ...d,
      items: d.items.filter((_, i) => i !== idx),
    }));

  // --- Handle Simpan ---
  const handleAddTransaksi = async () => {
    const total = addData.items.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );
    const payload = {
      ...addData,
      total,
      items: addData.items.map((it) => ({
        product_id: Number(it.product_id),
        quantity: Number(it.quantity),
        price: Number(it.price),
      })),
    };
    await fetch('/api/sales', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setShowAdd(false);
    window.location.reload();
  };

  // --- Handle Hapus ---
  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin hapus transaksi ini?')) return;
    await fetch(`/api/sales/${id}`, { method: 'DELETE' });
    setTransactions((trx) => trx.filter((t) => t.id !== id));
  };

  // --- Modal Edit (opsional: auto harga juga bisa) ---
  const addEditItemRow = () =>
    setEditTrx((trx) =>
      trx
        ? {
            ...trx,
            items: [
              ...(trx.items || []),
              { product_id: '', name: '', image_url: '', price: 0, quantity: 1 },
            ],
          }
        : null
    );
  const removeEditItemRow = (idx: number) =>
    setEditTrx((trx) =>
      trx
        ? { ...trx, items: trx.items?.filter((_, i) => i !== idx) }
        : null
    );
  const updateEditItem = (idx: number, field: string, value: string | number) =>
    setEditTrx((trx) =>
      trx
        ? {
            ...trx,
            items: trx.items?.map((item, i) =>
              i === idx
                ? field === 'product_id'
                  ? {
                      ...item,
                      product_id: value,
                      price:
                        products.find((p) => p.id === Number(value))?.price || 0,
                    }
                  : { ...item, [field]: value }
                : item
            ),
          }
        : null
    );

  const handleEditTransaksi = async () => {
    if (!editTrx) return;
    const total =
      editTrx.items?.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
      ) || 0;
    const payload = {
      customer_name: editTrx.customer_name,
      date: editTrx.date,
      total,
      items:
        editTrx.items?.map((it) => ({
          product_id: it.product_id,
          quantity: it.quantity,
          price: it.price,
        })) || [],
    };
    await fetch(`/api/sales/${editTrx.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setEditTrx(null);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-4xl font-bold text-red-500 mb-8">Daftar Transaksi</h1>
      <div className="flex mb-4 gap-2 justify-between">
        <input
          type="text"
          placeholder="Cari pelanggan/produk..."
          className="p-2 rounded border flex-1 bg-[#232329] text-white placeholder-gray-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setShowAdd(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition"
        >
          + Tambah Transaksi
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl bg-[#232329] p-4 shadow-lg">
        <table className="w-full rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-[#6c3129] text-white">
              <th className="py-4 px-4 font-bold text-center">Tanggal</th>
              <th className="py-4 px-4 font-bold text-center">Pelanggan</th>
              <th className="py-4 px-4 font-bold text-center">Produk</th>
              <th className="py-4 px-4 font-bold text-center">Total</th>
              <th className="py-4 px-4 font-bold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-black">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-white">
                  Tidak ada transaksi.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((trx) => (
                <tr
                  key={trx.id}
                  className="border-b border-[#232329] align-top hover:bg-[#1a1a1a] transition"
                >
                  <td className="py-6 px-4 text-center align-middle">
                    {formatTanggal(trx.date)}
                  </td>
                  <td className="py-6 px-4 text-center align-middle">
                    {trx.customer_name}
                  </td>
                  <td className="py-6 px-4 text-center align-middle">
                    <div className="flex flex-col gap-4 items-center">
                      {(!Array.isArray(trx.items) || trx.items.length === 0) && (
                        <span className="italic text-gray-400">
                          Tidak ada produk
                        </span>
                      )}
                      {Array.isArray(trx.items) &&
                        trx.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-4 mb-1"
                          >
                            {item.image_url ? (
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="h-16 w-16 object-cover rounded mx-auto border-2 border-gray-800"
                              />
                            ) : (
                              <div className="h-16 w-16 bg-gray-800 rounded flex items-center justify-center text-xs text-gray-400 mx-auto">
                                No Image
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-white text-lg">
                                {item.name}
                              </div>
                              <div className="text-base text-gray-300 font-medium">
                                {item.quantity} x Rp{' '}
                                {item.price.toLocaleString('id-ID')}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </td>
                  <td className="py-6 px-4 text-center align-middle font-bold text-green-300 text-lg">
                    Rp {trx.total.toLocaleString('id-ID')}
                  </td>
                  <td className="py-6 px-4 text-center align-middle">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded font-bold transition mr-2"
                      onClick={() => setEditTrx(trx)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(trx.id)}
                      className="bg-red-600 hover:bg-red-800 text-white px-6 py-2 rounded font-bold transition"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL TAMBAH TRANSAKSI */}
      {showAdd && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl">
            <h2 className="text-lg font-bold mb-3">Tambah Transaksi</h2>
            <div className="mb-2">
              <input
                className="border rounded px-2 py-2 w-full mb-3 text-black placeholder-gray-600"
                placeholder="Nama Pelanggan"
                value={addData.customer_name}
                onChange={(e) =>
                  setAddData((d) => ({ ...d, customer_name: e.target.value }))
                }
              />
              <input
                className="border rounded px-2 py-2 w-full mb-3 text-black"
                type="date"
                value={addData.date}
                onChange={(e) =>
                  setAddData((d) => ({ ...d, date: e.target.value }))
                }
              />
              <div className="mb-2">
                <div className="font-semibold mb-1 text-black">Produk:</div>
                {addData.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <select
                      className="border rounded px-2 py-1 text-black"
                      value={item.product_id}
                      onChange={(e) =>
                        updateAddItem(idx, 'product_id', e.target.value)
                      }
                    >
                      <option value="">Pilih Produk</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <input
                      className="border rounded px-2 py-1 w-20 text-black"
                      type="number"
                      min={1}
                      placeholder="Jumlah"
                      value={item.quantity}
                      onChange={(e) =>
                        updateAddItem(idx, 'quantity', e.target.value)
                      }
                    />
                    <input
                      className="border rounded px-2 py-1 w-24 bg-gray-100 text-gray-600"
                      type="number"
                      value={
                        item.product_id
                          ? products.find(
                              (p) => p.id === Number(item.product_id)
                            )?.price || 0
                          : ''
                      }
                      placeholder="Harga"
                      readOnly
                      disabled
                    />
                    <button
                      onClick={() => removeItemRow(idx)}
                      className="text-red-500 text-lg font-bold px-2"
                    >
                      x
                    </button>
                  </div>
                ))}
                <button
                  onClick={addItemRow}
                  className="bg-gray-200 rounded px-4 py-1 mt-1 font-semibold text-black"
                >
                  + Produk
                </button>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleAddTransaksi}
                className="bg-green-600 text-white px-6 py-2 rounded font-bold"
              >
                Simpan
              </button>
              <button
                onClick={() => setShowAdd(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT TRANSAKSI */}
      {editTrx && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl">
            <h2 className="text-lg font-bold mb-3">Edit Transaksi</h2>
            <div className="mb-2">
              <input
                className="border rounded px-2 py-2 w-full mb-3 text-black placeholder-gray-600"
                placeholder="Nama Pelanggan"
                value={editTrx.customer_name}
                onChange={(e) =>
                  setEditTrx((t) =>
                    t ? { ...t, customer_name: e.target.value } : t
                  )
                }
              />
              <input
                className="border rounded px-2 py-2 w-full mb-3 text-black"
                type="date"
                value={editTrx.date || ''}
                onChange={(e) =>
                  setEditTrx((t) =>
                    t ? { ...t, date: e.target.value } : t
                  )
                }
              />
              <div className="mb-2">
                <div className="font-semibold mb-1 text-black">Produk:</div>
                {(editTrx.items || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <select
                      className="border rounded px-2 py-1 text-black"
                      value={item.product_id}
                      onChange={(e) =>
                        updateEditItem(idx, 'product_id', e.target.value)
                      }
                    >
                      <option value="">Pilih Produk</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <input
                      className="border rounded px-2 py-1 w-20 text-black"
                      type="number"
                      min={1}
                      placeholder="Jumlah"
                      value={item.quantity}
                      onChange={(e) =>
                        updateEditItem(idx, 'quantity', e.target.value)
                      }
                    />
                    <input
                      className="border rounded px-2 py-1 w-24 bg-gray-100 text-gray-600"
                      type="number"
                      value={
                        item.product_id
                          ? products.find(
                              (p) => p.id === Number(item.product_id)
                            )?.price || 0
                          : ''
                      }
                      placeholder="Harga"
                      readOnly
                      disabled
                    />
                    <button
                      onClick={() => removeEditItemRow(idx)}
                      className="text-red-500 text-lg font-bold px-2"
                    >
                      x
                    </button>
                  </div>
                ))}
                <button
                  onClick={addEditItemRow}
                  className="bg-gray-200 rounded px-4 py-1 mt-1 font-semibold text-black"
                >
                  + Produk
                </button>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleEditTransaksi}
                className="bg-yellow-500 text-black px-6 py-2 rounded font-bold"
              >
                Simpan
              </button>
              <button
                onClick={() => setEditTrx(null)}
                className="bg-gray-400 text-white px-6 py-2 rounded font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
