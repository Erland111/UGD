'use server';

import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function createProduct(formData: FormData) {
  const name = formData.get('name')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const price = Number(formData.get('price'));
  const image_url = formData.get('image_url')?.toString().trim() || ''; 

  if (!name) throw new Error('Name kosong');
  if (!description) throw new Error('Description kosong');
  if (isNaN(price)) throw new Error('Price bukan angka');

  await sql`
    INSERT INTO products (name, description, price, image_url)
    VALUES (${name}, ${description}, ${price}, ${image_url})
  `;
}

export async function updateProduct(formData: FormData) {
  const id = Number(formData.get('id'));
  const name = formData.get('name')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const price = Number(formData.get('price'));
  const image_url = formData.get('image_url')?.toString().trim() || ''; 

  if (!id) throw new Error('ID kosong');
  if (!name) throw new Error('Name kosong');
  if (!description) throw new Error('Description kosong');
  if (isNaN(price)) throw new Error('Price bukan angka');

  await sql`
    UPDATE products
    SET name = ${name}, description = ${description}, price = ${price}, image_url = ${image_url}
    WHERE id = ${id}
  `;
}

export async function deleteProduct(id: number) {
  if (!id) throw new Error('Product ID is required');
  await sql`DELETE FROM products WHERE id = ${id}`;
}
