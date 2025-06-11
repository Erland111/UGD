import { NextResponse } from 'next/server';
import { fetchAllCustomers, createCustomer } from '@/lib/query/customers';

export async function GET() {
  try {
    const customers = await fetchAllCustomers();
    return NextResponse.json(customers);
  } catch (err) {
    return NextResponse.json({ message: 'Failed to fetch data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // VALIDASI SEDERHANA
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Jika mau validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Bisa juga cek duplicate email (opsional)
    // const all = await fetchAllCustomers();
    // if (all.some(c => c.email === body.email)) {
    //   return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    // }

    const inserted = await createCustomer(body);
    return NextResponse.json(inserted[0]);
  } catch (err) {
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}
