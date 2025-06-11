export default function ProfilePage() {
  const dataOrang = [
    { nama: "Erland", jabatan: "CEO", email: "erland@example.com" },
    { nama: "Dave", jabatan: "COO", email: "dave@example.com" },
    { nama: "Dion", jabatan: "CMO", email: "dion@example.com" },
    { nama: "David", jabatan: "CFO", email: "david@example.com" },
  ];

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-[#141417] rounded-xl p-8 shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-red-400 tracking-wide">Daftar Penunggu STECU</h1>
        <ul>
          {dataOrang.map((orang, idx) => (
            <li key={idx} className="mb-5">
              <div className="font-bold text-white text-lg">{orang.nama} <span className="text-sm text-red-400">({orang.jabatan})</span></div>
              <div className="text-white text-sm">Email: <span className="text-zinc-300">{orang.email}</span></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
