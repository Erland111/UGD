export default function ProfilePage() {
  const dataOrang = [
    { nama: "Erland", jabatan: "CEO", email: "erland@gmail.com" },
    { nama: "Dave", jabatan: "COO", email: "dave@gmail.com" },
    { nama: "Dion", jabatan: "CMO", email: "dion@gmail.com" },
    { nama: "David", jabatan: "CFO", email: "david@gmail.com" },
  ];

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-[#141417] rounded-2xl p-10 shadow-2xl w-full max-w-3xl flex flex-col items-center">
        {/* Gambar di atas judul */}
        <img
          src="/img/profile.png"
          alt="Tim STECU"
          className="w-40 h-40 object-contain rounded-xl shadow-lg mb-7"
        />
        <h1 className="text-2xl font-extrabold mb-6 text-red-400 tracking-wide text-center drop-shadow">Daftar Penunggu STECU</h1>
        <ul className="w-full">
          {dataOrang.map((orang, idx) => (
            <li key={idx} className="mb-6 text-center">
              <div className="font-bold text-white text-lg">{orang.nama} <span className="text-sm text-red-400">({orang.jabatan})</span></div>
              <div className="text-white text-base">Email: <span className="text-zinc-300">{orang.email}</span></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
