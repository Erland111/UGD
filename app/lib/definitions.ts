// ============================
// User
// ============================
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

// ============================
// Customer
// ============================
export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

// ============================
// Invoice
// ============================
export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

// ============================
// Revenue
// ============================
export type Revenue = {
  month: string;
  revenue: number;
};

// ============================
// Latest Invoice
// ============================
export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string; // formatted
};

export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number; // original number before formatting
};

// ============================
// Product (untuk SHOP PAGE)
// ============================
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
};
