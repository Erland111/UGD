// app/lib/query/products.ts
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
};

export async function fetchProducts(): Promise<Product[]> {
  const result = await sql<Product[]>`SELECT * FROM products ORDER BY id ASC`;
  return result;
}
