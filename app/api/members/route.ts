import { NextResponse } from "next/server";
import { fetchAllMembers } from "@/lib/query/members";

export async function GET() {
  try {
    const members = await fetchAllMembers();
    return NextResponse.json(members);
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
