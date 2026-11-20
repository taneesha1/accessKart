import { Button, Field, Select, Tab, TabList, Tag, Text, Title2 } from '@fluentui/react-components';
import { CartRegular, CheckmarkCircleRegular, GridRegular, HeartFilled, HeartRegular, StarRegular } from '@fluentui/react-icons';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';
import { formatCurrency } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export function ProductDetailPage() {
  const { id } = useParams();
  const { products, addPurchase, addRental, toggleWishlist, wishlist, comparison, toggleCompare } = useStore();
  const product = products.find((entry) => entry.id === id);
  const [mode, setMode] = useState<'purchase' | 'rental'>('purchase');
  const [days, setDays] = useState(7);
  if (!product) return <main className="page-main"><div className="empty-panel"><h1>We can’t find that product</h1><Text>It may have moved. Browse all of our thoughtful finds instead.</Text><Link className="fui-Button fui-Button--primary" to="/shop">Browse the collection</Link></div></main>;
  const rentalTotal = product.rentalRates ? days >= 30 ? product.rentalRates.monthly * Math.ceil(days / 30) : days >= 7 ? product.rentalRates.weekly * Math.ceil(days / 7) : product.rentalRates.daily * days : 0;
  const isCompared = comparison.includes(product.id);
  const canCompare = isCompared || comparison.length < 3;

  return (
    <main className="page-main detail-main">
      <PageIntro back="Product details" title={product.name} />
      <div className="detail-layout">
        <section className="detail-media"><img src={product.image} alt={product.name} /><span className="detail-media-label">A little more ease, every day</span></section>
        <section className="detail-copy">
          <Tag shape="rounded">{product.category}</Tag>
          <h1>{product.name}</h1>
          <p className="detail-maker">By {product.vendor} <span>·</span> <StarRegular aria-hidden="true" /> {product.rating} <span>({product.reviews} thoughtful reviews)</span></p>
          <p className="detail-description">{product.description}</p>
          <div className="detail-price">{formatCurrency(product.price)} <span>one-time purchase</span></div>
          <div className="detail-choice">
            <span className="detail-label">How would you like to bring it home?</span>
            <TabList selectedValue={mode} onTabSelect={(_, data) => setMode(data.value as 'purchase' | 'rental')}>
              <Tab value="purchase">Purchase · {formatCurrency(product.price)}</Tab>
              <Tab value="rental" disabled={!product.rentalRates}>Rent it</Tab>
            </TabList>
            {mode === 'rental' && product.rentalRates && <Field label="Choose a rental period">
              <Select value={String(days)} onChange={(event) => setDays(Number(event.currentTarget.value))}>
                <option value="1">One day · {formatCurrency(product.rentalRates.daily)}</option>
                <option value="7">One week · {formatCurrency(product.rentalRates.weekly)}</option>
                <option value="14">Two weeks · {formatCurrency(product.rentalRates.weekly * 2)}</option>
                <option value="30">One month · {formatCurrency(product.rentalRates.monthly)}</option>
              </Select>
            </Field>}
            {mode === 'rental' && <p className="rental-total-note">Your rental total <strong>{formatCurrency(rentalTotal)}</strong> {days === 1 ? 'for one day' : `for ${days} days`} · refundable deposit at checkout</p>}
          </div>
          <div className="detail-actions"><Button appearance="primary" icon={<CartRegular />} onClick={() => mode === 'purchase' ? addPurchase(product.id) : addRental(product.id, days)}>{mode === 'purchase' ? 'Add to purchase cart' : 'Add rental to cart'}</Button><Button appearance={wishlist.includes(product.id) ? 'secondary' : 'subtle'} icon={wishlist.includes(product.id) ? <HeartFilled /> : <HeartRegular />} aria-pressed={wishlist.includes(product.id)} onClick={() => toggleWishlist(product.id)}>{wishlist.includes(product.id) ? 'Saved for later' : 'Save for later'}</Button><Button appearance="subtle" icon={<GridRegular />} aria-pressed={isCompared} disabled={!canCompare} onClick={() => toggleCompare(product.id)}>{isCompared ? 'In your comparison' : 'Compare'}</Button></div>
          <div className="detail-reassurance"><span><CheckmarkCircleRegular /> Easy, friendly returns</span><span><CheckmarkCircleRegular /> Carefully checked by our team</span></div>
        </section>
      </div>
      <section className="specs-section"><div className="section-heading"><div><span className="eyebrow">The helpful details</span><Title2>Made for real life</Title2></div></div><dl className="spec-list">{Object.entries(product.specs).map(([label, value]) => <div key={label} className="spec-row"><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
    </main>
  );
}
