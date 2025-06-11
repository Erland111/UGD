import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password, nama_lengkap } = body;

  // Cek apakah username sudah ada
  const user = await sql`SELECT * FROM customers WHERE username = ${username}`;
  if (user.length > 0) {
    return NextResponse.json({ success: false, message: 'Username sudah terdaftar' }, { status: 409 });
  }

  // Simpan user baru
  await sql`
    INSERT INTO customers (username, password, name, status, member, progress)
    VALUES (${username}, ${password}, ${nama_lengkap}, 'Aktif', 'Gold', 0)
  `;

  return NextResponse.json({ success: true });
}
