"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!username || !password) return setError("Isi semua kolom!");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );
    if (!user) return setError("Username atau password salah!");

    // Simpan status login (optional, misal token, dst)
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Redirect sesuai role
    if (user.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/user");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-zinc-800">
      <div className="bg-[#18181b] p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center border border-red-900">
        <h1 className="text-3xl font-extrabold mb-2 text-red-600 font-serif tracking-wide drop-shadow">LOGIN</h1>
        <form className="w-full" onSubmit={handleLogin}>
          <input
            className="w-full px-4 py-2 rounded-lg border border-red-800 bg-zinc-950 mb-4 text-white placeholder-gray-400 focus:outline-red-600"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 rounded-lg border border-red-800 bg-zinc-950 mb-4 text-white placeholder-gray-400 focus:outline-red-600"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <div className="text-red-400 mb-3 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-red-700 hover:bg-red-900 text-white py-2 rounded-lg font-bold text-lg shadow transition"
          >
            LOGIN
          </button>
        </form>
        <div className="flex justify-between w-full mt-4 text-sm">
          <span>
            Belum punya akun?{" "}
            <a href="/register" className="text-red-400 hover:underline font-bold">Register</a>
          </span>
        </div>
      </div>
    </div>
  );
}
