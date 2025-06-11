import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function POST(req: Request) {
  const { username, password, role } = await req.json();
  const user = await sql`
    SELECT * FROM customers
    WHERE username = ${username} AND password = ${password} AND role = ${role}
    LIMIT 1
  `;
  if (user.length > 0) {
    // Kirim nama dan username admin ke FE
    return NextResponse.json({
      success: true,
      user: {
        nama: user[0].name,
        username: user[0].username,
        role: user[0].role,
      },
    });
  } else {
    return NextResponse.json(
      { success: false, message: 'Username/password/role salah!' },
      { status: 401 }
    );
  }
}
