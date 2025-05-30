// app/user/shop/page.tsx
import Image from 'next/image';

export default function ShopLanding() {
  return (
    <div className="min-h-screen bg-[#fafaf3] font-sans">
      {/* Navbar */}
      <header className="flex items-center justify-between px-16 py-6 border-b border-[#ecece2]">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-1">
            <span className="font-extrabold text-2xl text-[#566531] tracking-widest">ORGANIC</span>
            <span className="ml-1 text-[#9dae79] font-bold">STORE</span>
          </div>
          <nav className="flex gap-6 text-[#566531] font-semibold">
            <a href="#" className="hover:text-[#7c9562]">Everything</a>
            <a href="#" className="hover:text-[#7c9562]">Groceries</a>
            <a href="#" className="hover:text-[#7c9562]">Juice</a>
          </nav>
        </div>
        <div className="flex gap-6 items-center text-[#566531] font-semibold">
          <a href="#" className="hover:text-[#7c9562]">About</a>
          <a href="#" className="hover:text-[#7c9562]">Contact</a>
          <span>$0.00</span>
          <button className="hover:text-[#7c9562]">
            <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M6 6h15l-1.5 9h-13L4 4H2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button className="hover:text-[#7c9562]">
            <svg width="24" height="24" fill="none" stroke="currentColor"><circle cx="12" cy="8" r="4" strokeWidth="2"/><path d="M6 20c0-3 12-3 12 0" strokeWidth="2"/></svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex items-center justify-between px-24 py-16 relative">
        {/* Left: Gambar Produk */}
        <div className="relative flex-1 flex justify-center">
          <Image
            src="/images/organic-products.png" // Ganti dengan path gambar kamu
            width={430}
            height={410}
            alt="Organic Products"
            className="object-contain rounded-xl shadow-xl"
          />
          {/* Buat shadow/tomato, dll bisa pakai posisi absolute atau tambahkan img lagi */}
        </div>

        {/* Right: Text */}
        <div className="flex-1 flex flex-col justify-center pl-16">
          <div className="text-[#7c9562] font-bold mb-2 text-lg">Best Quality Products</div>
          <h1 className="text-5xl font-extrabold text-[#3a4922] mb-6 leading-tight">
            Join The Organic <br />Movement!
          </h1>
          <p className="text-[#747a54] mb-6 max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <button className="bg-[#7c9562] text-white font-bold px-7 py-3 rounded-md shadow hover:bg-[#566531] transition">
            SHOP NOW
          </button>
        </div>
      </main>
    </div>
  );
}
