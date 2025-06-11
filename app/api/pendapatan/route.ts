import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  const bulanan = await sql`SELECT * FROM pendapatan_bulanan ORDER BY id`;
  const harian = await sql`SELECT * FROM pendapatan_harian ORDER BY id`;

  return Response.json({ bulanan, harian });
}
