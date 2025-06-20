import postgres from "postgres";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
};

// Ambil semua produk
export async function getProducts(): Promise<Product[]> {
  try {
    const result = await sql<Product[]>`
      SELECT id, name, description, price, image_url
      FROM products
      ORDER BY id ASC
    `;
    return result;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Ambil satu produk by id
export async function getProductById(id: number): Promise<Product | null> {
  try {
    const result = await sql<Product[]>`
      SELECT id, name, description, price, image_url
      FROM products WHERE id = ${id} LIMIT 1
    `;
    return result[0] ?? null;
  } catch (error) {
    return null;
  }
}

// Tambah produk baru
export async function addProduct({ name, description, price, image_url }: Omit<Product, "id">) {
  try {
    const result = await sql<Product[]>`
      INSERT INTO products (name, description, price, image_url)
      VALUES (${name}, ${description}, ${price}, ${image_url})
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

// Update produk
export async function updateProduct({ id, name, description, price, image_url }: Product) {
  try {
    const result = await sql<Product[]>`
      UPDATE products
      SET name = ${name}, description = ${description}, price = ${price}, image_url = ${image_url}
      WHERE id = ${id}
      RETURNING *
    `;
    return result[0];
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Hapus produk by id
export async function deleteProduct(id: number) {
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
}
