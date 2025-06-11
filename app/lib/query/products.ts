import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
};

export async function getProducts(): Promise<Product[]> {
  try {
    const result = await sql<Product[]>`
      SELECT id, name, description, price, image_url
      FROM products
      ORDER BY id ASC
    `;
    return result;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: number) {
  // pastikan pakai id integer
  try {
    const result = await sql`
      SELECT id, name, description, price, image_url
      FROM products WHERE id = ${id} LIMIT 1
    `;
    return result[0] ?? null;
  } catch (error) {
    return null;
  }
}


export async function deleteProduct(id: number) {
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    return true;
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    return false;
  }
}
