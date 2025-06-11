'use server';

import postgres from 'postgres';
import bcrypt from 'bcryptjs';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function loginUser(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const user = await sql`SELECT * FROM users WHERE username = ${username}`;

  if (user.length === 0) {
    throw new Error("Username tidak ditemukan");
  }

  const isValid = await bcrypt.compare(password, user[0].password_hash);

  if (!isValid) {
    throw new Error("Password salah");
  }

  // Simpan session / redirect ke dashboard
  return { success: true, redirect: "/admin/dashboard" };
}
