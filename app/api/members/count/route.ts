import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  // Pakai nama tabel yang benar: customers
  const result = await sql`SELECT COUNT(*) FROM customers`;
  const count = Number(result[0].count);
  return NextResponse.json({ count });
}
