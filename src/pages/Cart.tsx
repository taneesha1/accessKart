import { Button, Card, Input, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Text } from '@fluentui/react-components';
import { ArrowRightRegular, DeleteRegular, CartRegular } from '@fluentui/react-icons';
import { Link } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';
import { OrderSummary } from '../components/OrderSummary';
import { formatCurrency } from '../components/ProductCard';
import { rentalPrice, useCartTotals, useStore } from '../context/StoreContext';

export function CartPage() {
  const { products, updateQuantity, removeCartItem } = useStore();
  const totals = useCartTotals();
  function remove(id: string, type: 'purchase' | 'rental', name: string) {
    if (window.confirm(`Remove ${name} from your ${type} order?`)) removeCartItem(id, type);
  }
  if (!totals.purchases.length && !totals.rentals.length) return <main className="page-main"><PageIntro eyebrow="Your space, your pace" title="Your cart is taking a breather" description="Whenever you find something that feels right, we’ll keep it safe here." /><Card className="empty-panel cart-empty"><span className="empty-icon"><CartRegular /></span><h2>Nothing in your cart just yet</h2><Text>Take a look around. There’s no rush to decide.</Text><Link className="fui-Button fui-Button--primary" to="/shop"><ArrowRightRegular /> Find something helpful</Link></Card></main>;
  return (
    <main className="page-main cart-main">
      <PageIntro eyebrow="Ready when you are" title="Your cart" description="Purchases and rentals stay organized separately, so everything is easy to understand." />
      <div className="cart-layout"><div className="cart-items-column">
        {!!totals.purchases.length && <section className="cart-section"><div className="cart-section-heading"><div><span className="eyebrow">Keep it for good</span><h2>Purchase order</h2></div><Text>{totals.purchases.length} {totals.purchases.length === 1 ? 'item' : 'items'}</Text></div><div className="table-scroll"><Table aria-label="Items in your purchase order"><TableHeader><TableRow><TableHeaderCell>Product</TableHeaderCell><TableHeaderCell>Quantity</TableHeaderCell><TableHeaderCell>Price</TableHeaderCell><TableHeaderCell><span className="sr-only">Remove item</span></TableHeaderCell></TableRow></TableHeader><TableBody>{totals.purchases.map((item) => { const product = products.find((entry) => entry.id === item.productId); if (!product) return null; return <TableRow key={item.productId}><TableCell><CartProduct productId={product.id} image={product.image} name={product.name} vendor={product.vendor} /></TableCell><TableCell><Input className="quantity-input" aria-label={`Quantity of ${product.name}`} type="number" min="1" value={String(item.quantity)} onChange={(_, data) => updateQuantity(product.id, 'purchase', Number(data.value))} /></TableCell><TableCell>{formatCurrency(product.price * item.quantity)}</TableCell><TableCell><Button appearance="subtle" icon={<DeleteRegular />} aria-label={`Remove ${product.name} from purchase order`} onClick={() => remove(product.id, 'purchase', product.name)} /></TableCell></TableRow>; })}</TableBody></Table></div></section>}
        {!!totals.rentals.length && <section className="cart-section"><div className="cart-section-heading"><div><span className="eyebrow">For a little while</span><h2>Rental order</h2></div><Text>{totals.rentals.length} {totals.rentals.length === 1 ? 'rental' : 'rentals'}</Text></div><div className="table-scroll"><Table aria-label="Items in your rental order"><TableHeader><TableRow><TableHeaderCell>Product</TableHeaderCell><TableHeaderCell>Rental period</TableHeaderCell><TableHeaderCell>Rental fee</TableHeaderCell><TableHeaderCell><span className="sr-only">Remove rental</span></TableHeaderCell></TableRow></TableHeader><TableBody>{totals.rentals.map((item) => { const product = products.find((entry) => entry.id === item.productId); if (!product) return null; return <TableRow key={`${item.productId}-${item.days}`}><TableCell><CartProduct productId={product.id} image={product.image} name={product.name} vendor={product.vendor} /></TableCell><TableCell>{item.days} days · {item.quantity} {item.quantity === 1 ? 'rental' : 'rentals'}</TableCell><TableCell>{formatCurrency(rentalPrice(product, item.days ?? 7) * item.quantity)}</TableCell><TableCell><Button appearance="subtle" icon={<DeleteRegular />} aria-label={`Remove ${product.name} rental`} onClick={() => remove(product.id, 'rental', product.name)} /></TableCell></TableRow>; })}</TableBody></Table></div><Text size={200} className="rental-cart-note">A $50 refundable deposit per rental is included in your total.</Text></section>}
      </div><aside className="cart-summary-column"><OrderSummary /></aside></div>
    </main>
  );
}

function CartProduct({ productId, image, name, vendor }: { productId: string; image: string; name: string; vendor: string }) {
  return <Link to={`/product/${productId}`} className="cart-product"><img src={image} alt="" /><span><strong>{name}</strong><small>{vendor}</small></span></Link>;
}
