// customers-storage.ts
export interface Customer {
  id: string;
  name: string;
  social: string;
  progress: number;
  member: string;
  status: string;
}

// Data awal (biar langsung muncul dave, erland, david, dion)
const initialCustomers: Customer[] = [
  { id: '1', name: 'dave', social: '081234567890', progress: 10000, member: 'VIP', status: 'Aktif' },
  { id: '2', name: 'erland', social: '081234567891', progress: 20000, member: 'Standard', status: 'Aktif' },
  { id: '3', name: 'david', social: '081234567892', progress: 30000, member: 'Prioritas', status: 'Aktif' },
  { id: '4', name: 'dion', social: '081234567893', progress: 40000, member: 'diamond', status: 'Aktif' },
];

export function getCustomers(): Customer[] {
  if (typeof window === "undefined") return initialCustomers;
  const data = localStorage.getItem("customers");
  if (!data) {
    localStorage.setItem("customers", JSON.stringify(initialCustomers));
    return initialCustomers;
  }
  return JSON.parse(data);
}

export function saveCustomers(customers: Customer[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("customers", JSON.stringify(customers));
}

export function generateId() {
  return String(Date.now() + Math.floor(Math.random() * 1000));
}
