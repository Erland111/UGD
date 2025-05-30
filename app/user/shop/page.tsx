// app/user/shop/page.tsx
import { fetchProducts } from '../../../lib/query/products';

export default async function ShopPage() {
  const products = await fetchProducts();

  return (
    <div>
      <h1>Shop</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> - {p.description} <br />
            <span>Rp {p.price.toLocaleString('id-ID')}</span>
            {p.image_url && (
              <img src={p.image_url} alt={p.name} width={100} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
