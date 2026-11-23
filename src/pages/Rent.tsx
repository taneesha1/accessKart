import { Button, Card, CardFooter, CardHeader, CardPreview, Field, Select, Text } from '@fluentui/react-components';
import { ArrowRightRegular, CalendarRegular, CartRegular, ShieldCheckmarkRegular } from '@fluentui/react-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { calculateRentalDeposit } from '../api/pricing';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { PageIntro } from '../components/PageIntro';
import { formatCurrency } from '../components/ProductCard';
import { rentalPrice, useStore } from '../context/StoreContext';

export function RentPage() {
  const { products, addRental } = useStore();
  const rentable = products.filter((product) => product.rentalRates);
  const [periods, setPeriods] = useState<Record<string, number>>({});
  return (
    <main className="page-main rent-main">
      <PageIntro eyebrow="Try it your way" title="Rent a little more freedom" description="Give something a try before you make it yours. Pick a period that feels right; we’ll take care of the details." />
      <div className="rental-benefits"><span><CalendarRegular /> Flexible, easy-to-understand periods</span><span><ShieldCheckmarkRegular /> Every rental is checked with care</span><span><ArrowRightRegular /> <Link to="/shop">Love it? Keep it.</Link></span></div>
      <div className="rental-grid">
        {rentable.map((product) => {
          const days = periods[product.id] ?? 7;
          return <Card key={product.id} className="rental-card">
            <CardPreview className="rental-preview"><Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}><ImageWithFallback src={product.image} alt="" loading="lazy" /></Link><span className="rental-pill">Available to rent</span></CardPreview>
            <CardHeader header={<Link className="product-title" to={`/product/${product.id}`}>{product.name}</Link>} description={<span className="product-vendor">{product.vendor}</span>} />
            <div className="rental-card-content">
              <Field label="Choose a rental period"><Select value={String(days)} onChange={(event) => setPeriods((current) => ({ ...current, [product.id]: Number(event.currentTarget.value) }))}>
                <option value="1">Daily · {formatCurrency(product.rentalRates!.daily)} / day</option>
                <option value="7">Weekly · {formatCurrency(product.rentalRates!.weekly)} / week</option>
                <option value="14">Two weeks · {formatCurrency(product.rentalRates!.weekly * 2)}</option>
                <option value="30">Monthly · {formatCurrency(product.rentalRates!.monthly)} / month</option>
              </Select></Field>
              <div className="rental-price-row"><span><strong>{formatCurrency(rentalPrice(product, days))}</strong><small>for {days} {days === 1 ? 'day' : 'days'}</small></span><span className="deposit-note">+{formatCurrency(calculateRentalDeposit(product.price))} refundable deposit</span></div>
            </div>
            <CardFooter><Button appearance="primary" icon={<CartRegular />} onClick={() => addRental(product.id, days)}>Add rental to cart</Button><Link className="fui-Button fui-Button--subtle" to={`/product/${product.id}`}>Details</Link></CardFooter>
          </Card>;
        })}
      </div>
      {!rentable.length && <div className="empty-panel"><h2>No rentals are available right now</h2><Text>Explore our full collection of products instead.</Text><Link className="fui-Button fui-Button--primary" to="/shop">Shop the collection</Link></div>}
    </main>
  );
}
