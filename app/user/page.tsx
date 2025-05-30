// app/user/home/page.tsx
'use client';

export default function UserHomePage() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center px-6 md:px-24 py-16 gap-12 min-h-[90vh]">
      {/* Kartu Menu */}
      <section className="flex flex-col gap-6 w-full max-w-xs">
        {/* Nasi Goreng Hantu */}
        <div className="bg-[#232027] border border-[#653731] rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          <div className="text-5xl">🍔</div>
          <div className="text-5xl">💧</div>
          <div>
            <h3 className="font-extrabold text-xl text-yellow-300">Nasi Goreng Hantu</h3>
            <p className="text-gray-300 text-sm mt-1">Spesial saus darah vampir. Dijamin bikin merinding!</p>
          </div>
        </div>
        {/* Bakso Genderuwo */}
        <div className="bg-[#232027] border border-[#a67841] rounded-2xl p-6 flex items-center gap-4 shadow-lg">
          <div className="text-5xl">🥟</div>
          <div className="text-5xl">👹</div>
          <div>
            <h3 className="font-extrabold text-xl text-purple-300">Bakso Genderuwo</h3>
            <p className="text-gray-300 text-sm mt-1">Bakso kenyal dengan isian rahasia dari dunia lain.</p>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="max-w-xl w-full flex flex-col items-start">
        {/* Hapus tulisan merah/kuning dan judul! */}
        <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight mb-2">
          Sambut Makan<br />
          Malam <span className="text-[#ff4353]">Paling Mencekam</span>
        </h1>
        <p className="mt-4 mb-8 text-lg text-gray-100">
          Temukan sensasi kuliner mistis di <span className="text-yellow-300 font-bold">STECU</span>. Hati-hati, rasa dan suasananya bisa bikin kamu merinding ketagihan!
        </p>
        <button className="bg-[#ff4353] hover:bg-[#e13a46] transition px-8 py-3 rounded-xl text-xl font-extrabold text-white shadow-lg">
          PESAN SEKARANG
        </button>
      </section>
    </div>
  );
}
