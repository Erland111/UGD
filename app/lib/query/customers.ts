import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

// Ambil semua pelanggan
export async function fetchAllCustomers() {
  try {
    return await sql`SELECT * FROM customers ORDER BY id DESC`;
  } catch (err) {
    console.error('❌ Error fetchAllCustomers:', err);
    return [];
  }
}

// Ambil pelanggan by ID
export async function fetchCustomerById(id: number) {
  try {
    const res = await sql`SELECT * FROM customers WHERE id = ${id} LIMIT 1`;
    return res[0] ?? null;
  } catch (err) {
    console.error('❌ Error fetchCustomerById:', err);
    return null;
  }
}

// Tambah pelanggan
export async function createCustomer(data: {
  name: string;
  social: string;
  progress: number;
  member: string;
  status: string;
}) {
  try {
    const res = await sql`
      INSERT INTO customers (name, social, progress, member, status)
      VALUES (${data.name}, ${data.social}, ${data.progress}, ${data.member}, ${data.status})
      RETURNING *;
    `;
    return res[0] ?? null;
  } catch (err) {
    console.error('❌ Error createCustomer:', err);
    return null;
  }
}

// Update pelanggan
export async function updateCustomer(id: number, data: {
  name: string;
  social: string;
  progress: number;
  member: string;
  status: string;
}) {
  try {
    const res = await sql`
      UPDATE customers SET
        name = ${data.name},
        social = ${data.social},
        progress = ${data.progress},
        member = ${data.member},
        status = ${data.status}
      WHERE id = ${id}
      RETURNING *;
    `;
    return res[0] ?? null;
  } catch (err) {
    console.error('❌ Error updateCustomer:', err);
    return null;
  }
}

// Delete pelanggan
export async function deleteCustomer(id: number) {
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
    return true;
  } catch (err) {
    console.error('❌ Error deleteCustomer:', err);
    return false;
  }
}
