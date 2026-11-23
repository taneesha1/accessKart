import { Card, CardHeader, Text } from '@fluentui/react-components';
import { LockClosedRegular } from '@fluentui/react-icons';
import { Link } from 'react-router-dom';
import { formatCurrency } from './ProductCard';
import { useCartTotals } from '../context/StoreContext';

export function OrderSummary({ checkout = false }: { checkout?: boolean }) {
  const { purchaseSubtotal, rentalSubtotal, deposit, total, purchases, rentals } = useCartTotals();
  return (
    <Card className="order-summary">
      <CardHeader header={<Text size={500} weight="semibold">A little order recap</Text>} description={<Text size={200}>Every detail, right where it should be.</Text>} />
      <div className="summary-lines">
        {purchases.length > 0 && <><div className="summary-group-label">PURCHASES</div><SummaryLine label="Items" value={formatCurrency(purchaseSubtotal)} /><SummaryLine label="Shipping" value="On us" /></>}
        {rentals.length > 0 && <><div className="summary-group-label">RENTALS</div><SummaryLine label="Rental fees" value={formatCurrency(rentalSubtotal)} /><SummaryLine label="Refundable deposit" value={formatCurrency(deposit)} /></>}
        <div className="summary-total"><Text weight="semibold">Total today</Text><Text weight="semibold">{formatCurrency(total)}</Text></div>
        <Text size={200} className="summary-tax-note">Retail prices include applicable taxes. Rental deposits are refundable.</Text>
      </div>
      {checkout ? <div className="checkout-assurance"><LockClosedRegular /><Text size={200}>Demo checkout · no payment is processed</Text></div> : <Link to="/checkout" className="summary-cta fui-Button fui-Button--primary" aria-disabled={!purchases.length && !rentals.length}>Continue to checkout</Link>}
      {!checkout && <Link to="/shop" className="summary-continue">Keep exploring</Link>}
    </Card>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return <div className="summary-line"><Text>{label}</Text><Text weight="semibold">{value}</Text></div>;
}
