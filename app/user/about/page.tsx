export default function AboutPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-[#141417] rounded-2xl p-12 shadow-2xl w-full max-w-4xl flex flex-col items-center">
        {/* Gambar-gambar di atas judul */}
        <div className="flex gap-8 mb-8">
          <img
            src="/img/1.png"
            alt="Horror Theme 1"
            className="w-44 h-44 object-contain rounded-xl shadow-lg"
          />
          <img
            src="/img/2.png"
            alt="Horror Theme 2"
            className="w-44 h-44 object-contain rounded-xl shadow-lg"
          />
        </div>
        <h1 className="text-4xl font-black mb-6 text-red-400 text-center drop-shadow">Tentang STECU</h1>
        <p className="text-2xl text-gray-200 text-center font-medium">
          <span className="font-black text-yellow-300">STECU</span> adalah toko makanan bertema horor dengan konsep unik,
          bikin makan jadi menantang dan seru! Nikmati sensasi kuliner mistis yang tidak akan kamu temukan di tempat lain.
        </p>
      </div>
    </div>
  );
}
