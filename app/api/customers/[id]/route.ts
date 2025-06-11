import { NextResponse } from "next/server";
import { fetchCustomerById, updateCustomer, deleteCustomer } from "@/lib/query/customers";

// GET pelanggan by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cust = await fetchCustomerById(Number(params.id));
    return NextResponse.json(cust);
  } catch {
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}

// PATCH (update) pelanggan by ID
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const body = await req.json();
  try {
    const updated = await updateCustomer(id, body);
    return NextResponse.json(updated[0]);
  } catch {
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}

// DELETE pelanggan by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteCustomer(Number(params.id));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}
