import { NextResponse } from "next/server";
import { deleteProduct, getProductById, updateProduct } from "@/lib/query/products";

// Ambil produk by id
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
  const produk = await getProductById(id);
  if (!produk) return NextResponse.json({ success: false, message: "Produk tidak ditemukan" }, { status: 404 });
  return NextResponse.json(produk);
}

// Hapus produk
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
  const success = await deleteProduct(id);
  if (success) return NextResponse.json({ success: true });
  return NextResponse.json({ success: false, message: "Failed to delete" }, { status: 500 });
}

// Update produk
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const body = await req.json();
  const { name, description, price, image_url } = body;
  if (!name || !description || !price || !image_url)
    return NextResponse.json({ success: false, message: "Isi semua kolom" }, { status: 400 });
  const updated = await updateProduct({ id, name, description, price, image_url });
  return NextResponse.json(updated);
}
