import { Button, Card, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Text } from '@fluentui/react-components';
import { CartRegular, DeleteRegular, SearchRegular } from '@fluentui/react-icons';
import { Link } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';
import { formatCurrency } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export function ComparePage() {
  const { products, comparison, toggleCompare, addPurchase } = useStore();
  const selected = comparison.map((id) => products.find((product) => product.id === id)).filter((product) => product !== undefined);
  const allRows = [
    { label: 'What it’s best for', value: (id: string) => products.find((product) => product.id === id)?.primaryUse ?? '—' },
    { label: 'Purchase price', value: (id: string) => formatCurrency(products.find((product) => product.id === id)?.price ?? 0) },
    { label: 'Monthly rental', value: (id: string) => { const rate = products.find((product) => product.id === id)?.rentalRates; return rate ? formatCurrency(rate.monthly) : 'Not available'; } },
    { label: 'Product weight', value: (id: string) => products.find((product) => product.id === id)?.weight ?? '—' },
    { label: 'Weight capacity', value: (id: string) => products.find((product) => product.id === id)?.specs['Weight capacity'] ?? '—' },
    { label: 'Vendor rating', value: (id: string) => `${products.find((product) => product.id === id)?.rating ?? '—'} / 5` },
  ];

  function remove(productId: string, name: string) {
    if (window.confirm(`Remove ${name} from your comparison?`)) toggleCompare(productId);
  }

  return (
    <main className="page-main compare-main">
      <PageIntro eyebrow="A clearer picture" title="Find the one that feels right" description="A side-by-side look at your saved picks. Compare up to three products at a time." />
      {!selected.length ? <Card className="empty-panel"><span className="empty-icon"><SearchRegular /></span><h2>Your comparison is ready when you are</h2><Text>Add a few favorites from the collection to see how they stack up.</Text><Link className="fui-Button fui-Button--primary" to="/shop">Explore products</Link></Card> : <>
        <div className="compare-topline"><Text>{selected.length} of 3 products selected</Text><Link to="/shop">Add another product</Link></div>
        <div className="table-scroll"><Table className="compare-table" aria-label="Product comparison"><TableHeader><TableRow><TableHeaderCell className="compare-label-cell">Compare the details</TableHeaderCell>{selected.map((product) => <TableHeaderCell key={product.id}><div className="compare-product-heading"><Link to={`/product/${product.id}`}><img src={product.image} alt="" />{product.name}</Link><Button appearance="subtle" size="small" icon={<DeleteRegular />} aria-label={`Remove ${product.name} from comparison`} onClick={() => remove(product.id, product.name)}>Remove</Button></div></TableHeaderCell>)}</TableRow></TableHeader><TableBody>{allRows.map((row) => <TableRow key={row.label}><TableCell className="compare-label-cell">{row.label}</TableCell>{selected.map((product) => <TableCell key={product.id}>{row.value(product.id)}</TableCell>)}</TableRow>)}</TableBody></Table></div>
        <div className="compare-product-actions">{selected.map((product) => <Button key={product.id} appearance="primary" icon={<CartRegular />} onClick={() => addPurchase(product.id)}>Add {product.name} to cart</Button>)}</div>
      </>}
    </main>
  );
}
