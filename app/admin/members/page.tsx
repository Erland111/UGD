// app/admin/members/page.tsx
'use client';

import Link from 'next/link';

const dummyMembers = [
  {
    id: 1,
    nama: 'Joko',
    hp: '0812xxxxxxx',
    email: 'joko@mail.com',
    status: 'VIP',
    totalBelanja: 1200000,
  },
  {
    id: 2,
    nama: 'Lisa',
    hp: '0813xxxxxxx',
    email: 'lisa@mail.com',
    status: 'Reguler',
    totalBelanja: 200000,
  },
  // ...tambah data lain
];

export default function MembersPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-red-500">👥 Daftar Member</h1>
        <Link href="/admin/members/add" className="bg-red-600 px-4 py-2 rounded-lg text-white">+ Tambah Member</Link>
      </div>
      <table className="w-full bg-gray-900 text-white rounded-xl overflow-hidden">
        <thead>
          <tr>
            <th className="p-2">Nama</th>
            <th className="p-2">No HP</th>
            <th className="p-2">Status</th>
            <th className="p-2">Total Belanja</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {dummyMembers.map((m) => (
            <tr key={m.id} className="border-t border-gray-800">
              <td className="p-2">{m.nama}</td>
              <td className="p-2">{m.hp}</td>
              <td className="p-2">{m.status}</td>
              <td className="p-2">Rp {m.totalBelanja.toLocaleString('id-ID')}</td>
              <td className="p-2">
                <Link href={`/admin/members/${m.id}/detail`} className="mr-2 text-blue-400 underline">Detail</Link>
                <Link href={`/admin/members/${m.id}/edit`} className="mr-2 text-yellow-400 underline">Edit</Link>
                <button className="text-red-400 underline">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
