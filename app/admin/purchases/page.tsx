// app/admin/purchases/page.tsx
'use client';
import React, { useState } from 'react';

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
  const removeBahan = (idx: number) => setForm(f => ({ // <-- FIX (tambah typing)
    ...f,
    bahan: f.bahan.filter((_, i) => i !== idx)
  }));

  // Handle field bahan
  const handleBahanChange = (
  idx: number,
  field: 'nama' | 'jumlah' | 'satuan' | 'harga',
  value: string | number
) => {
  const bahan = [...form.bahan];

  if (field === 'jumlah' || field === 'harga') {
    // konversi ke number
    (bahan[idx] as any)[field] = Number(value);
  } else {
    (bahan[idx] as any)[field] = value;
  }

  // Otomatis update satuan kalau field-nya "nama"
  if (field === 'nama') {
    const find = dummyBahan.find(b => b.nama === value);
    if (find) bahan[idx].satuan = find.satuan;
    else bahan[idx].satuan = ''; // biar enggak undefined
  }

  setForm((f: any) => ({ ...f, bahan }));
};

  // Tambah pembelian
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { // <-- FIX (typing)
    e.preventDefault();
    const total = form.bahan.reduce((sum: number, b: { harga: any; jumlah: any; }) => sum + (Number(b.harga) * Number(b.jumlah)), 0);
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
  const handleDelete = (id: number) => setPurchases(purchases.filter(p => p.id !== id)); // <-- FIX (typing)

  // ... (UI bagian bawah tidak berubah, tetap seperti kode kamu)
}
