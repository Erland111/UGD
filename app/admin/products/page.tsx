'use client';

import Image from 'next/image';
import { useState } from 'react';

type MenuItem = {
  id: number;
  nama: string;
  harga: number;
  img: string;
};

const initialMenus: MenuItem[] = [
  {
    id: 1,
    nama: 'Nasi Goreng Hantu',
    harga: 25001,
    img: '/images/products/close-up-view-delicious-halloween-cookies.jpg',
  },
  {
    id: 2,
    nama: 'Mie Ayam Pocong',
    harga: 12000,
    img: '/images/products/close-up-view-halloween-donuts-concept.jpg',
  },
  {
    id: 3,
    nama: 'Bakso Kuah Genderuwo',
    harga: 20000,
    img: '/images/products/festive-cute-halloween-cookies (1).jpg',
  },
  {
    id: 4,
    nama: 'Mie Pangsit Setan',
    harga: 13000,
    img: '/images/products/halloween-concept-table.jpg',
  },
  {
    id: 5,
    nama: 'Ayam Goreng Kuntilanak',
    harga: 25000,
    img: '/images/products/high-angle-halloween-food-arrangement-concept.jpg',
  },
];

export default function MenuPage() {
  const [menus, setMenus] = useState<MenuItem[]>(initialMenus);

  const handleDelete = (id: number) => {
    if (confirm('Apakah kamu yakin ingin menghapus menu menyeramkan ini? 👻')) {
      setMenus(menus.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-8 py-6">
      <h1 className="text-4xl font-extrabold mb-6 text-red-600 flex items-center gap-2">
        <span role="img" aria-label="ghost">👻</span> Menu Horor STECU
      </h1>

      <div className="mb-4 flex items-center gap-4">
        <label className="text-yellow-400 font-bold" htmlFor="show">Show:</label>
        <select id="show" className="bg-gray-900 border border-red-800 rounded px-3 py-1 text-white font-semibold">
          <option>5</option>
          <option>10</option>
          <option>All</option>
        </select>
        <input
          className="ml-6 bg-gray-900 border border-gray-700 rounded px-3 py-1 text-white"
          placeholder="Cari menu horor..."
          disabled // fitur cari dummy
        />
        <button
          className="bg-red-800 hover:bg-red-700 ml-2 px-4 py-2 rounded font-bold text-white shadow transition"
          disabled
        >
          Tambah Menu Baru
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="w-full bg-gray-900 rounded-xl">
          <thead>
            <tr className="bg-red-900 text-white text-left">
              <th className="py-3 px-4">NO</th>
              <th className="py-3 px-4">MENU</th>
              <th className="py-3 px-4">PRICE</th>
              <th className="py-3 px-4">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id} className="border-b border-gray-800 hover:bg-red-950 transition">
                <td className="py-2 px-4">{menu.id}</td>
                <td className="py-2 px-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded overflow-hidden border-2 border-yellow-900 shadow-inner">
                    <Image
                      src={menu.img}
                      alt={menu.nama}
                      width={56}
                      height={56}
                      className="object-cover w-14 h-14"
                    />
                  </div>
                  <span className="font-bold">{menu.nama}</span>
                </td>
                <td className="py-2 px-4 text-yellow-300 font-bold">
                  {menu.harga.toLocaleString('id-ID')} IDR
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 px-3 py-1 rounded font-bold text-black shadow transition"
                    disabled
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-800 px-3 py-1 rounded font-bold text-white shadow transition"
                    onClick={() => handleDelete(menu.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {menus.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-gray-400 py-10 text-xl animate-pulse">
                  <span role="img" aria-label="ghost">👻</span> Tidak ada menu horor tersedia...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
