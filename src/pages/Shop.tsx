import { Button, Divider, Input, Select, Tab, TabList, Text } from '@fluentui/react-components';
import { ArrowRightRegular, FilterRegular } from '@fluentui/react-icons';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export function ShopPage() {
  const { products, categories } = useStore();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get('search') ?? '');
  const [vendor, setVendor] = useState('all');
  const [rating, setRating] = useState('all');
  const [maxPrice, setMaxPrice] = useState('');
  const [availability, setAvailability] = useState<'all' | 'purchase' | 'rental'>('all');
  const category = params.get('category') ?? 'all';
  const vendors = useMemo(() => [...new Set(products.map((product) => product.vendor))].sort(), [products]);
  const filtered = products.filter((product) => {
    const matchesText = `${product.name} ${product.category} ${product.vendor}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || product.categoryId === category;
    const matchesVendor = vendor === 'all' || product.vendor === vendor;
    const matchesRating = rating === 'all' || product.rating >= Number(rating);
    const matchesPrice = !maxPrice || product.price <= Number(maxPrice);
    const matchesAvailability = availability === 'all' || (availability === 'rental' ? Boolean(product.rentalRates) : true);
    return matchesText && matchesCategory && matchesVendor && matchesRating && matchesPrice && matchesAvailability;
  });
  const selectedCategory = categories.find((entry) => entry.id === category);

  function resetFilters() {
    setSearch('');
    setVendor('all');
    setRating('all');
    setMaxPrice('');
    setAvailability('all');
    setParams({});
  }

  return (
    <main className="page-main shop-main">
      <PageIntro eyebrow="The AccessKart edit" title={selectedCategory?.name ?? 'Find your kind of support'} description={selectedCategory?.description ?? 'Considered essentials for living, moving, connecting, and learning on your terms.'} />
      <div className="shop-layout">
        <aside className="shop-sidebar" aria-label="Product filters">
          <div className="sidebar-heading"><FilterRegular /><Text weight="semibold">Refine your search</Text><button className="text-button" onClick={resetFilters}>Reset</button></div>
          <label className="filter-label" htmlFor="shop-search">Search products</label>
          <Input id="shop-search" value={search} onChange={(_, data) => setSearch(data.value)} placeholder="Try “walker”" />
          <Divider />
          <span className="filter-label">Shop by category</span>
          <TabList vertical selectedValue={category} onTabSelect={(_, data) => setParams(data.value === 'all' ? {} : { category: String(data.value) })}>
            <Tab value="all">Everything</Tab>
            {categories.map((item) => <Tab key={item.id} value={item.id}>{item.name}</Tab>)}
          </TabList>
          <Divider />
          <label className="filter-label" htmlFor="vendor">Brand or maker</label>
          <Select id="vendor" value={vendor} onChange={(event) => setVendor(event.currentTarget.value)}><option value="all">All makers</option>{vendors.map((entry) => <option key={entry}>{entry}</option>)}</Select>
          <label className="filter-label" htmlFor="rating">Customer rating</label>
          <Select id="rating" value={rating} onChange={(event) => setRating(event.currentTarget.value)}><option value="all">Any rating</option><option value="4.5">4.5 stars & up</option><option value="4.7">4.7 stars & up</option><option value="4.9">4.9 stars</option></Select>
          <label className="filter-label" htmlFor="price-cap">Maximum price</label>
          <Input id="price-cap" type="number" min="0" value={maxPrice} onChange={(_, data) => setMaxPrice(data.value)} placeholder="No limit" contentAfter={<span className="input-currency">$</span>} />
          <fieldset className="filter-options"><legend className="filter-label">Availability</legend>{(['all', 'purchase', 'rental'] as const).map((mode) => <label key={mode} className="radio-option"><input type="radio" name="availability" checked={availability === mode} onChange={() => setAvailability(mode)} />{mode === 'all' ? 'Purchase or rent' : mode === 'rental' ? 'Rentable only' : 'Purchase only'}</label>)}</fieldset>
        </aside>
        <section className="shop-results" aria-live="polite">
          <div className="results-toolbar"><div><Text weight="semibold">{filtered.length} thoughtfully chosen {filtered.length === 1 ? 'find' : 'finds'}</Text><Text size={200} className="subtle-copy"> — take your time, you’re in the right place.</Text></div><Text size={200}>{selectedCategory ? <Link to="/shop">Clear category</Link> : 'Made for everyday living'}</Text></div>
          {filtered.length ? <div className="product-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-panel filter-empty"><span className="empty-icon"><FilterRegular /></span><h2>No matches just yet</h2><Text>Try broadening a filter or clearing your search to see more options.</Text><Button appearance="primary" onClick={resetFilters}>Clear filters <ArrowRightRegular /></Button></div>}
        </section>
      </div>
    </main>
  );
}
