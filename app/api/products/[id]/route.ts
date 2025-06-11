import { NextResponse } from "next/server";
import { getProductById } from "@/lib/query/products";
import { deleteProduct } from "@/lib/action/products";

export async function GET(req, { params }) {
  const id = Number(params.id);
  const data = await getProductById(id);
  if (!data) {
    return NextResponse.json({}, { status: 404 });
  }
  return NextResponse.json(data);
}

export async function DELETE(req, { params }) {
  const id = Number(params.id); // PAKAI params.id, BUKAN dari body!
  await deleteProduct(id); // Pastikan deleteProduct hanya butuh id (number)
  return NextResponse.json({ success: true });
}
