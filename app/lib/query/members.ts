import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function fetchAllMembers() {
  // Query ke tabel customers, bukan members!
  return await sql`SELECT * FROM customers ORDER BY id DESC`;
}
