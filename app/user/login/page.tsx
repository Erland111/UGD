export default function LoginPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Login Pengguna</h1>
      <form className="flex flex-col gap-4">
        <input type="email" placeholder="Email" className="border p-2 rounded" />
        <input type="password" placeholder="Password" className="border p-2 rounded" />
        <button className="bg-red-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
