'use client';
import Link from "next/link";
import { ReactNode, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaFacebookSquare, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

export default function UserLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const u = localStorage.getItem("loggedInUser");
      if (!u) {
        router.replace('/login');
        return;
      }
      const parsed = JSON.parse(u);
      setUser(parsed);
      // Jika admin, tendang ke dashboard admin
      if (parsed.role === 'admin') {
        router.replace('/admin/dashboard');
      }
    }
  }, [router]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(false);
      }
    }
    if (dropdown) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdown]);

  function handleLogout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login";
  }

  const initial = user?.username?.[0]?.toUpperCase() || "U";

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/video/bg-user.mp4" type="video/mp4" />
        Browser tidak mendukung video.
      </video>
      {/* Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-0" />

      {/* Navbar - FIXED */}
      <nav className="fixed top-0 left-0 w-full bg-[#9c1919] p-4 flex gap-8 items-center text-white z-20 shadow-lg"
        style={{ height: 72 }}>
        <Link href="/user/" className="text-white font-bold">Home</Link>
        <Link href="/user/shop" className="text-white font-bold">Shop</Link>
        <Link href="/user/about" className="text-white font-bold">About</Link>
        <Link href="/user/profile" className="text-white font-bold">Profile</Link>
        {/* Profile/Login kanan atas */}
        <div className="ml-auto relative" ref={dropdownRef}>
          {user ? (
            <button
              className="flex items-center gap-2 bg-white/30 px-2 py-1 rounded-full font-bold hover:bg-white/50 transition"
              onClick={() => setDropdown((v) => !v)}
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <span className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-xl text-[#9c1919] font-extrabold border-2 border-[#c94e4e]">
                {initial}
              </span>
              <span className="hidden sm:inline-block">&#9662;</span>
            </button>
          ) : (
            <Link href="/login" className="text-white font-bold">Login</Link>
          )}
          {/* Dropdown */}
          {dropdown && user && (
            <div className="absolute right-0 mt-3 bg-white shadow-2xl rounded-xl px-6 py-4 min-w-[200px] z-30 flex flex-col items-center"
              style={{ top: '54px', minWidth: 220, border: "1.5px solid #aaa" }}>
              <div className="flex flex-col items-center gap-0 mb-3">
                <span className="text-base font-bold text-gray-800 break-all text-center">{user.username}</span>
                <span className="text-xs text-gray-400">{user.role}</span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-800 text-white font-bold text-base px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <svg width="18" height="18" className="mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" /></svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content (Kasih padding-top biar ga ketutup navbar) */}
      <main className="relative z-10 pt-[88px] pb-4">{children}</main>

      {/* ----------- FOOTER SOSIAL MEDIA ------------ */}
      <footer className="relative z-10 w-full mt-12 flex flex-col items-center justify-center">
        <div className="border-2 border-[#ad3f3f] rounded-xl px-8 py-5 bg-[#18181c] flex flex-col items-center shadow-xl max-w-xs mx-auto">
          <span className="text-orange-400 font-bold text-lg mb-3" style={{ letterSpacing: 1 }}>
            Follow Us On
          </span>
          <div className="flex gap-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <span className="text-3xl text-white hover:text-blue-400 transition">
                <FaFacebookSquare />
              </span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <span className="text-3xl text-white hover:text-blue-300 transition">
                <FaTwitter />
              </span>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <span className="text-3xl text-white hover:text-red-500 transition">
                <FaYoutube />
              </span>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <span className="text-3xl text-white hover:text-pink-400 transition">
                <FaInstagram />
              </span>
            </a>
          </div>
        </div>
      </footer>
      {/* -------------------------------------------- */}

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.17s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px);}
          to   { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}
