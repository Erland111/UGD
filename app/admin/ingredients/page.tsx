'use client';
import { useState } from 'react';

const dummyBahan = [
  { nama: "Daging Sapi", satuan: "kg" },
  { nama: "Roti Burger", satuan: "pcs" },
  { nama: "Selada", satuan: "ikat" },
  { nama: "Pumpkin", satuan: "buah" },
  { nama: "Keju", satuan: "block" }
];

const dummyPurchases = [
  {
    id: 1,
    tanggal: '2024-05-16',
    supplier: 'PT Hantu Supplies',
    total: 350000,
    bahan: [
      { nama: 'Daging Sapi', jumlah: 2, satuan: 'kg', harga: 120000 },
      { nama: 'Roti Burger', jumlah: 10, satuan: 'pcs', harga: 30000 }
    ]
  },
  {
    id: 2,
    tanggal: '2024-05-15',
    supplier: 'PT Pumpkin Corp',
    total: 170000,
    bahan: [
      { nama: 'Pumpkin', jumlah: 5, satuan: 'buah', harga: 34000 }
    ]
  }
];

export default function PembelianPage() {
  const [purchases, setPurchases] = useState(dummyPurchases);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(null as null | typeof dummyPurchases[0]);
  const [form, setForm] = useState({
    supplier: '',
    tanggal: '',
    bahan: [{ nama: '', jumlah: 1, satuan: '', harga: 0 }],
  });

  // Tambah bahan pada form
  const addBahan = () => setForm(f => ({
    ...f,
    bahan: [...f.bahan, { nama: '', jumlah: 1, satuan: '', harga: 0 }]
  }));

  // Hapus bahan pada form
  const removeBahan = idx => setForm(f => ({
    ...f,
    bahan: f.bahan.filter((_, i) => i !== idx)
  }));

  // Handle field bahan
  const handleBahanChange = (idx, field, value) => {
    const bahan = [...form.bahan];
    bahan[idx][field] = value;
    // Jika nama, otomatis ambil satuan dari dummyBahan
    if(field === 'nama'){
      const find = dummyBahan.find(b => b.nama === value);
      if(find) bahan[idx].satuan = find.satuan;
    }
    setForm(f => ({ ...f, bahan }));
  };

  // Tambah pembelian
  const handleSubmit = (e) => {
    e.preventDefault();
    const total = form.bahan.reduce((sum, b) => sum + (Number(b.harga) * Number(b.jumlah)), 0);
    setPurchases([
      ...purchases,
      {
        id: purchases.length + 1,
        tanggal: form.tanggal,
        supplier: form.supplier,
        total,
        bahan: form.bahan
      }
    ]);
    setShowForm(false);
    setForm({ supplier: '', tanggal: '', bahan: [{ nama: '', jumlah: 1, satuan: '', harga: 0 }] });
  };

  // Hapus pembelian
  const handleDelete = (id) => setPurchases(purchases.filter(p => p.id !== id));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-red-600">🧟‍♂️ Daftar Pembelian Bahan Baku</h1>
      <button
        className="mb-4 bg-red-700 hover:bg-red-800 text-white font-semibold px-4 py-2 rounded shadow"
        onClick={() => setShowForm(true)}
      >
        + Tambah Pembelian
      </button>

      {/* Modal Tambah */}
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-40 flex items-center justify-center">
          <form className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-lg space-y-2" onSubmit={handleSubmit}>
            <h2 className="text-xl mb-2 text-red-400 font-bold">Tambah Pembelian</h2>
            <input required type="text" placeholder="Supplier" className="input" value={form.supplier} onChange={e => setForm(f => ({ ...f, supplier: e.target.value }))} />
            <input required type="date" className="input" value={form.tanggal} onChange={e => setForm(f => ({ ...f, tanggal: e.target.value }))} />
            
            <div>
              <label className="block font-semibold text-gray-300 mb-1">Bahan Baku</label>
              {form.bahan.map((b, idx) => (
                <div key={idx} className="flex gap-2 mb-1">
                  <select required className="input"
                    value={b.nama}
                    onChange={e => handleBahanChange(idx, 'nama', e.target.value)}>
                    <option value="">Pilih Bahan</option>
                    {dummyBahan.map(bh => <option key={bh.nama} value={bh.nama}>{bh.nama}</option>)}
                  </select>
                  <input required type="number" min="1" placeholder="Jumlah" className="input w-20"
                    value={b.jumlah} onChange={e => handleBahanChange(idx, 'jumlah', e.target.value)} />
                  <input required type="text" disabled className="input w-16"
                    value={b.satuan} placeholder="Satuan" />
                  <input required type="number" min="1" placeholder="Harga" className="input w-28"
                    value={b.harga} onChange={e => handleBahanChange(idx, 'harga', e.target.value)} />
                  {form.bahan.length > 1 && (
                    <button type="button" onClick={() => removeBahan(idx)} className="text-red-500 px-1">🗑️</button>
                  )}
                </div>
              ))}
              <button type="button" className="text-green-500 font-bold mt-1" onClick={addBahan}>+ Tambah Bahan</button>
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button className="bg-green-700 px-3 py-1 rounded text-white" type="submit">Simpan</button>
              <button className="bg-gray-600 px-3 py-1 rounded text-white" type="button" onClick={() => setShowForm(false)}>Batal</button>
            </div>
          </form>
        </div>
      )}

      {/* Daftar Pembelian */}
      <div className="grid md:grid-cols-2 gap-6">
        {purchases.map(p => (
          <div key={p.id} className="bg-gray-900 rounded-xl shadow p-4 relative hover:scale-[1.02] transition">
            <button
              onClick={() => handleDelete(p.id)}
              className="absolute top-2 right-2 text-red-600 hover:text-red-400 text-xl font-bold"
              title="Hapus"
            >×</button>
            <div className="font-semibold text-lg">{p.supplier}</div>
            <div className="text-gray-400 text-sm">Tanggal: {p.tanggal}</div>
            <div className="my-2">
              <span className="text-gray-300">Jumlah item: {p.bahan.length}</span>
            </div>
            <div className="font-bold text-red-400 mb-2">Total: Rp {p.total.toLocaleString()}</div>
            <button
              className="text-white bg-red-800 rounded px-3 py-1 shadow hover:bg-red-600"
              onClick={() => setShowDetail(p)}
            >
              Lihat Detail
            </button>
          </div>
        ))}
      </div>

      {/* Modal Detail Pembelian */}
      {showDetail && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="bg-gray-900 p-8 rounded-xl shadow-xl w-full max-w-md relative">
            <button className="absolute top-3 right-4 text-xl text-white" onClick={() => setShowDetail(null)}>✕</button>
            <h3 className="text-2xl font-bold text-red-400 mb-3">Detail Pembelian</h3>
            <div className="text-lg text-white mb-1 font-semibold">{showDetail.supplier}</div>
            <div className="text-gray-400 mb-3">Tanggal: {showDetail.tanggal}</div>
            <div className="mb-2">
              <div className="font-semibold text-red-300 mb-1">Bahan Dibeli:</div>
              <ul className="list-disc ml-6 text-gray-300">
                {showDetail.bahan.map((b, i) => (
                  <li key={i}>
                    {b.nama} — {b.jumlah} {b.satuan} × Rp {b.harga.toLocaleString()} <br />
                    <span className="text-xs text-gray-500">Subtotal: Rp {(b.harga * b.jumlah).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="font-bold text-red-400 mt-2">Total: Rp {showDetail.total.toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
  
// Tambahkan di global.css:
// .input { @apply mb-2 px-3 py-2 rounded w-full bg-gray-800 text-white placeholder:text-gray-400 outline-none border border-gray-600 focus:border-red-500; }
