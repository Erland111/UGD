import Link from "next/link";
import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <nav className="bg-[#101018] p-4 flex gap-8 items-center text-white">
        <Link href="/user/" className="text-white font-bold">Home</Link>
        <Link href="/user/shop" className="text-white font-bold">Shop</Link>
        <Link href="/user/about" className="text-white font-bold">About</Link>
        <Link href="/user/profile" className="text-white font-bold">Profile</Link>
        <Link href="/login" className="text-white font-bold ml-auto font-bold">Login</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}
                