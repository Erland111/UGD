export default function UserHomePage() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="space-y-8 w-full md:w-1/2">
        {/* Card Produk 1 */}
        <div className="bg-[#141417] rounded-xl p-6 shadow-lg flex gap-4 items-center">
          <span className="text-5xl">🍔</span>
          <div>
            <div className="font-extrabold text-yellow-300 text-2xl mb-1">Nasi Goreng Hantu</div>
            <div className="text-gray-300 text-sm">
              Spesial saus darah vampir. Dijamin bikin merinding ketagihan!
            </div>
          </div>
        </div>
        {/* Card Produk 2 */}
        <div className="bg-[#141417] rounded-xl p-6 shadow-lg flex gap-4 items-center">
          <span className="text-5xl">🥟</span>
          <div>
            <div className="font-extrabold text-purple-300 text-2xl mb-1">Bakso Genderuwo</div>
            <div className="text-gray-300 text-sm">
              Bakso kenyal isi rahasia dunia lain. Wajib coba!
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-black leading-tight mb-4 text-center">
          SAMBUT MAKAN MALAM <span className="text-red-400">PALING MENCEKAM</span>
        </h1>
        <p className="text-yellow-300 text-lg font-bold mb-8 text-center">
          Temukan sensasi kuliner mistis di <span className="text-[#ffd700]">STECU</span>!
        </p>
        <button className="bg-red-400 hover:bg-red-500 text-white rounded-xl px-8 py-4 text-2xl font-bold shadow-lg">
          PESAN SEKARANG
        </button>
      </div>
    </div>
  );
}
