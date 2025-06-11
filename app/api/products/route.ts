import { NextResponse } from "next/server";
import { getProducts, deleteProduct } from "@/lib/query/products";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await deleteProduct(id);
  return NextResponse.json({ success: true });
}
