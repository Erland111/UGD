"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [sukses, setSukses] = useState("");
  const router = useRouter();

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSukses("");
    if (!username || !password || !nama || !email) return setError("Semua wajib diisi!");
    if (password !== konfirmasi) return setError("Password tidak sama!");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const sudahAda = users.some((u: any) => u.username === username || u.email === email);
    if (sudahAda) return setError("Username atau email sudah terdaftar!");

    users.push({ username, nama_lengkap: nama, email, password, role });
    localStorage.setItem("users", JSON.stringify(users));
    setSukses("Registrasi berhasil! Mengalihkan ke halaman login...");
    setUsername(""); setNama(""); setEmail(""); setPassword(""); setKonfirmasi("");

    setTimeout(() => router.push("/login"), 1000); // Redirect ke login
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-zinc-800">
      <div className="bg-[#18181b] p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center border border-red-900">
        <h1 className="text-3xl font-extrabold mb-2 text-red-600 font-serif tracking-wide drop-shadow">REGISTER</h1>
        <p className="text-gray-400 mb-7 text-sm">Isi data untuk jadi pelanggan horor STECU</p>
        <form className="w-full" onSubmit={handleRegister}>
          <input
            className="w-full px-4 py-2 rounded-lg border border-red-800 bg-zinc-950 mb-3 text-white placeholder-gray-400 focus:outline-red-600"
            type="text"
            placeholder="Nama Lengkap"
            value={nama}
            onChange={e => setNama(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 rounded-lg border border-red-800 bg-zinc-950 mb-3 text-white placeholder-gray-400 focus:outline-red-600"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 rounded-lg border border-red-800 bg-zinc-950 mb-3 text-white placeholder-gray-400 focus:outline-red-600"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 rounded-lg border border-red-800 bg-zinc-950 mb-3 text-white placeholder-gray-400 focus:outline-red-600"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 rounded-lg border border-red-800 bg-zinc-950 mb-3 text-white placeholder-gray-400 focus:outline-red-600"
            type="password"
            placeholder="Konfirmasi Password"
            value={konfirmasi}
            onChange={e => setKonfirmasi(e.target.value)}
          />
          <select
            className="w-full px-4 py-2 rounded-lg border border-red-800 bg-zinc-950 mb-4 text-white focus:outline-red-600"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {error && <div className="text-red-400 mb-3 text-sm">{error}</div>}
          {sukses && <div className="text-green-400 mb-3 text-sm">{sukses}</div>}
          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-900 text-white py-2 rounded-lg font-bold text-lg shadow transition"
          >
            REGISTER
          </button>
        </form>
        <div className="flex justify-between w-full mt-4 text-sm">
          <span>
            Sudah punya akun?{" "}
            <Link href="/login" className="text-red-400 hover:underline font-bold">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
