import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const data = await sql`
    SELECT 
      s.id, s.customer_name, s.date, s.total,
      COALESCE(
        json_agg(
          json_build_object(
            'product_id', si.product_id,
            'name', p.name,
            'image_url', p.image_url,
            'price', si.price,
            'quantity', si.quantity
          )
        ) FILTER (WHERE si.product_id IS NOT NULL), '[]'
      ) as items
    FROM sales s
    LEFT JOIN sales_items si ON s.id = si.sale_id
    LEFT JOIN products p ON si.product_id = p.id
    WHERE s.id = ${id}
    GROUP BY s.id
    LIMIT 1
  `;
  if (!data[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const row = data[0];
  return NextResponse.json({
    ...row,
    items: typeof row.items === "string" ? JSON.parse(row.items) : row.items,
  });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  await sql`DELETE FROM sales_items WHERE sale_id = ${id}`;
  await sql`DELETE FROM sales WHERE id = ${id}`;
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const body = await req.json();

  // Validasi basic
  if (!body.customer_name || !body.date || !Array.isArray(body.items)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  // Update tabel sales
  await sql`
    UPDATE sales
    SET customer_name = ${body.customer_name},
        date = ${body.date},
        total = ${body.total}
    WHERE id = ${id}
  `;

  // Hapus semua sales_items lama untuk transaksi ini
  await sql`DELETE FROM sales_items WHERE sale_id = ${id}`;

  // Insert ulang semua item yang baru
  for (const item of body.items) {
    await sql`
      INSERT INTO sales_items (sale_id, product_id, quantity, price)
      VALUES (${id}, ${item.product_id}, ${item.quantity}, ${item.price})
    `;
  }

  return NextResponse.json({ success: true });
}
