// app/admin/customers/[id]/detail.tsx

"use client";
import { useParams, useRouter } from "next/navigation";
import { getCustomers } from "../customers-storage";
import { useEffect, useState } from "react";

export default function DetailCustomerPage() {
  const params = useParams();
  const { id } = params as { id: string };
  const [customer, setCustomer] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const customers = getCustomers();
    const cust = customers.find((c: any) => c.id === id);
    if (!cust) router.push("/admin/customers");
    setCustomer(cust);
  }, [id]);

  if (!customer) return <div className="p-8 text-white">Memuat...</div>;
  return (
    <div className="p-8 max-w-lg mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">{customer.name}</h1>
      <p><b>Social:</b> {customer.social}</p>
      <p><b>Progress:</b> {customer.progress}</p>
      <p><b>Member:</b> {customer.member}</p>
      <p><b>Status:</b> {customer.status}</p>
    </div>
  );
}
