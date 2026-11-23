import { Card, CardHeader, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Text, Title2 } from '@fluentui/react-components';
import { CheckmarkCircleRegular, HeartRegular } from '@fluentui/react-icons';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { formatCurrency } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export function OrderConfirmationPage() {
  const { id = '' } = useParams();
  const location = useLocation();
  const { orders, profile, products } = useStore();
  const ids = (location.state as { ids?: string[] } | null)?.ids ?? [id];
  const confirmed = ids.map((orderId) => orders.find((order) => order.id === orderId)).filter((order) => order !== undefined);
  if (!confirmed.length) return <main className="page-main"><Card className="empty-panel"><h1>We can’t find that order</h1><Text>Your order history is always available in your account.</Text><Link className="fui-Button fui-Button--primary" to="/account">View your account</Link></Card></main>;
  const firstName = profile.name.split(' ')[0] || 'there';
  return (
    <main className="page-main confirmation-main">
      <Card className="confirmation-banner"><span className="confirmation-icon"><CheckmarkCircleRegular /></span><span className="eyebrow">All taken care of</span><h1>Thank you, {firstName}.</h1><Text>Your order is confirmed. We’ll take it from here.</Text><div className="confirmation-sparkle"><HeartRegular /></div></Card>
      <section className="confirmation-orders"><div className="section-heading"><div><span className="eyebrow">The happy details</span><Title2>Your order, at a glance</Title2></div><Text>{confirmed.length} {confirmed.length === 1 ? 'order' : 'orders'} placed</Text></div>
        <div className="table-scroll"><Table aria-label="Confirmed orders"><TableHeader><TableRow><TableHeaderCell>Order</TableHeaderCell><TableHeaderCell>Type</TableHeaderCell><TableHeaderCell>What you chose</TableHeaderCell><TableHeaderCell>Next steps</TableHeaderCell><TableHeaderCell>Total</TableHeaderCell></TableRow></TableHeader><TableBody>{confirmed.map((order) => {
          const product = products.find((entry) => order.items.includes(entry.name));
          const nextStep = order.type === 'Purchase' ? 'Arrives in 3–5 days' : `Rental · ${order.items[0]}`;
          return <TableRow key={order.id}><TableCell><strong>{order.id}</strong></TableCell><TableCell><span className={`order-type-badge order-type-badge--${order.type.toLowerCase()}`}>{order.type}</span></TableCell><TableCell>{product ? <span className="confirmation-product"><ImageWithFallback src={product.image} alt="" />{order.items.join(', ')}</span> : order.items.join(', ')}</TableCell><TableCell>{nextStep}</TableCell><TableCell>{formatCurrency(order.total)}</TableCell></TableRow>;
        })}</TableBody></Table></div>
      </section>
      <Card className="confirmation-next"><CardHeader header={<Text weight="semibold">What happens next?</Text>} description={<Text>We’ll send the details to {profile.email || 'your inbox'}. You can always check progress in your account.</Text>} action={<Link className="fui-Button fui-Button--secondary" to="/account">Go to my orders</Link>} /></Card>
      <div className="confirmation-actions"><Link className="fui-Button fui-Button--primary" to="/shop">Keep exploring</Link><Link className="fui-Button fui-Button--subtle" to="/account">View your account</Link></div>
    </main>
  );
}
