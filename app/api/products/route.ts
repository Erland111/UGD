import { NextResponse } from "next/server";
import { getProducts, addProduct } from "@/lib/query/products";

// Ambil semua produk
export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

// Tambah produk baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, image_url } = body;

    if (!name || !description || !price || !image_url) {
      return NextResponse.json(
        { success: false, message: "Isi semua kolom" },
        { status: 400 }
      );
    }

    const produkBaru = await addProduct({ name, description, price, image_url });
    return NextResponse.json({ success: true, produkBaru });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menambah produk" },
      { status: 500 }
    );
  }
}
