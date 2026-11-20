import { Button, Card, CardFooter, CardHeader, CardPreview, Text } from '@fluentui/react-components';
import { CartRegular, DeleteRegular } from '@fluentui/react-icons';
import { Link } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';
import { formatCurrency } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export function WishlistPage() {
  const { products, wishlist, toggleWishlist, addPurchase, addRental } = useStore();
  const saved = wishlist.map((id) => products.find((product) => product.id === id)).filter((product) => product !== undefined);
  function remove(id: string, name: string) {
    if (window.confirm(`Remove ${name} from your saved products?`)) toggleWishlist(id);
  }
  return (
    <main className="page-main wishlist-main">
      <PageIntro eyebrow="No need to decide today" title="Saved for when you’re ready" description="Your favorite finds, waiting right here. Take your time; they aren’t going anywhere." />
      {saved.length ? <div className="wishlist-grid">{saved.map((product) => <Card key={product.id} className="wishlist-card">
        <CardPreview className="wishlist-preview"><Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}><img src={product.image} alt="" loading="lazy" /></Link></CardPreview>
        <CardHeader header={<Link className="product-title" to={`/product/${product.id}`}>{product.name}</Link>} description={<span className="product-vendor">{product.vendor}</span>} />
        <div className="wishlist-product-price"><strong>{formatCurrency(product.price)}</strong><Text size={200}>{product.rentalRates ? `or rent from ${formatCurrency(product.rentalRates.daily)}/day` : 'Available to purchase'}</Text></div>
        <CardFooter className="wishlist-card-actions"><Button appearance="primary" icon={<CartRegular />} onClick={() => addPurchase(product.id)}>Add to purchase</Button>{product.rentalRates && <Button appearance="secondary" onClick={() => addRental(product.id, 7)}>Choose a rental</Button>}<Button appearance="subtle" icon={<DeleteRegular />} aria-label={`Remove ${product.name} from saved products`} onClick={() => remove(product.id, product.name)}>Remove</Button></CardFooter>
      </Card>)}</div> : <Card className="empty-panel wishlist-empty"><h2>Nothing saved just yet</h2><Text>When something catches your eye, tap the heart and we’ll keep it safe.</Text><Link className="fui-Button fui-Button--primary" to="/shop">Explore the collection</Link></Card>}
      {!!saved.length && <div className="wishlist-note"><Text>Saved with care, for whenever you’re ready.</Text><Link to="/shop">Find more things that help</Link></div>}
    </main>
  );
}
