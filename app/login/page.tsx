// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './rain.css'; // Tambahkan CSS hujan di langkah berikutnya

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'admin123' && password === '12345') {
      router.push('/admin/dashboard');
    } else {
      alert('Username atau password salah!');
    }
  };

  return (
    <div className="login-bg flex items-center justify-center min-h-screen text-white relative">
      <div className="absolute inset-0 rain z-0"></div>

      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-zinc-800/70 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md space-y-4"
      >
        <h1 className="text-3xl text-center text-red-500 font-bold tracking-wider">👻 STECU Login</h1>

        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 bg-zinc-900 text-white border border-red-500 rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-zinc-900 text-white border border-red-500 rounded-md"
        />

        <button
          type="submit"
          className="w-full py-3 bg-red-700 hover:bg-red-600 font-bold rounded-md"
        >
          MASUK DUNIA HOROR
        </button>

        <p className="text-sm text-center text-gray-300 mt-2">Username: <code>admin123</code> | Password: <code>12345</code></p>
      </form>
    </div>
  );
}
