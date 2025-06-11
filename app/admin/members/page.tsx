"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Tipe data harus sesuai kolom database-mu (termasuk id, walau tidak ditampilkan)
type Member = {
  id: number;
  name: string;
  social: string;
  progress: number;
  status: string;
  member: string;
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => {
        setMembers(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Daftar Member</h1>
      <Link
        href="/admin/members/add"
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold mb-4 inline-block"
      >
        Tambah Member
      </Link>
      <table className="w-full bg-[#141417] rounded-xl overflow-hidden mt-4">
        <thead>
          <tr className="bg-[#232329] text-yellow-300">
            {/* <th className="py-3 px-4 text-left">ID</th> */}
            <th className="py-3 px-4 text-left">Nama</th>
            <th className="py-3 px-4 text-left">No. HP</th>
            <th className="py-3 px-4 text-left">Progress</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Member</th>
            <th className="py-3 px-4 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="py-4 text-center">
                Loading...
              </td>
            </tr>
          ) : members.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-4 text-center">
                Tidak ada data member.
              </td>
            </tr>
          ) : (
            members.map((m) => (
              <tr key={m.id} className="border-b border-[#232329]">
                {/* <td className="py-2 px-4">{m.id}</td> */}
                <td className="py-2 px-4">{m.name}</td>
                <td className="py-2 px-4">{m.social}</td>
                <td className="py-2 px-4">{m.progress}</td>
                <td className="py-2 px-4">{m.status}</td>
                <td className="py-2 px-4">{m.member}</td>
                <td className="py-2 px-4">
                  <Link
                    href={`/admin/members/${m.id}`}
                    className="text-blue-400 underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
