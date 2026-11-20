import { Button, Card, CardFooter, CardHeader, CardPreview, Tag, Text } from '@fluentui/react-components';
import { CartRegular, GridRegular, HeartFilled, HeartRegular, StarRegular } from '@fluentui/react-icons';
import { Link } from 'react-router-dom';
import type { Product } from '../api/types';
import { useStore } from '../context/StoreContext';

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { wishlist, toggleWishlist, comparison, toggleCompare, addPurchase } = useStore();
  const saved = wishlist.includes(product.id);
  const compared = comparison.includes(product.id);
  return (
    <Card className={`product-card${compact ? ' product-card--compact' : ''}`}>
      <CardPreview className="product-card-preview">
        <Link to={`/product/${product.id}`} className="product-image-link" aria-label={`View ${product.name}`}>
          <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <div className="product-image-actions">
          <Button size="small" shape="circular" appearance="subtle" icon={saved ? <HeartFilled /> : <HeartRegular />} aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={saved} onClick={() => toggleWishlist(product.id)} />
        </div>
        {product.rentalRates && <span className="image-rental-tag">Rental available</span>}
      </CardPreview>
      <CardHeader
        header={<Link className="product-title" to={`/product/${product.id}`}>{product.name}</Link>}
        description={<span className="product-vendor">{product.vendor} <span aria-hidden="true">·</span> <StarRegular aria-hidden="true" /> {product.rating} <span className="review-count">({product.reviews})</span></span>}
        action={<Tag size="small" shape="rounded">{product.category}</Tag>}
      />
      <div className="product-card-body">
        <Text className="product-card-copy">{product.description}</Text>
        <div className="product-price-row"><span className="product-price">{formatCurrency(product.price)}</span><span className="product-price-caption">one-time purchase</span></div>
        <Text size={200} className="rental-caption">{product.rentalRates ? `Rent from ${formatCurrency(product.rentalRates.daily)}/day` : 'Available to purchase'}</Text>
      </div>
      <CardFooter className="product-card-footer">
        <Button appearance="primary" icon={<CartRegular />} onClick={() => addPurchase(product.id)}>Add to cart</Button>
        <Button appearance={compared ? 'secondary' : 'subtle'} icon={<GridRegular />} aria-pressed={compared} disabled={comparison.length >= 3} onClick={() => toggleCompare(product.id)}>Compare</Button>
      </CardFooter>
    </Card>
  );
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
