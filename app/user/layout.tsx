// app/user/layout.tsx
import Link from "next/link";
import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-black">
      <nav className="bg-red-600 p-4 flex gap-6">
        <Link href="/user" className="text-white font-bold">Home</Link>
        <Link href="/user/shop" className="text-white">Shop</Link>
        <Link href="/user/about" className="text-white">About</Link>
        <Link href="/user/profile" className="text-white">Profile</Link>
        <Link href="/user/login" className="text-white ml-auto">Login</Link>
      </nav>
      <main className="max-w-7xl mx-auto p-8">{children}</main>
    </div>
  );
}
