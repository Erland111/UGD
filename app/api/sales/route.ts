import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  const rows = await sql`
    SELECT 
      s.id,
      s.customer_name,
      s.date,
      s.total,
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
      ) AS items
    FROM sales s
    LEFT JOIN sales_items si ON s.id = si.sale_id
    LEFT JOIN products p ON si.product_id = p.id
    GROUP BY s.id, s.customer_name, s.date, s.total
    ORDER BY s.date DESC
  `;
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { customer_name, date, total, items } = body;
  const insertSales = await sql`
    INSERT INTO sales (customer_name, date, total)
    VALUES (${customer_name}, ${date}, ${total})
    RETURNING id
  `;
  const sale_id = insertSales[0].id;

  for (const item of items) {
    await sql`
      INSERT INTO sales_items (sale_id, product_id, quantity, price)
      VALUES (${sale_id}, ${item.product_id}, ${item.quantity}, ${item.price})
    `;
  }
  return NextResponse.json({ success: true });
}
