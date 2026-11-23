import { Card, CardHeader, CardPreview, Divider, Tag, Text, Title2 } from '@fluentui/react-components';
import { ArrowRightRegular, CheckmarkCircleRegular, HeartRegular, StarRegular } from '@fluentui/react-icons';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

const promises = ['Curated with care', 'Purchase or rent', 'Real people, ready to help'];

export function HomePage() {
  const { products, categories } = useStore();
  return (
    <main className="page-main home-main">
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">Good support changes everything</span>
          <h1>Find your own way<br />to <em>everyday</em> ease.</h1>
          <p>Thoughtful tools, trusted people, and a little more freedom for all the things you want to do.</p>
          <div className="hero-actions"><Link className="fui-Button fui-Button--primary" to="/shop">Explore the collection <ArrowRightRegular /></Link><Link to="/rent" className="hero-text-link">See rental options</Link></div>
          <div className="hero-proof"><span className="proof-avatar-stack"><i>J</i><i>A</i><i>M</i></span><span>Loved by 2,400+ families</span><span className="proof-stars" aria-label="Five out of five stars"><StarRegular /><StarRegular /><StarRegular /><StarRegular /><StarRegular /></span></div>
        </div>
        <div className="hero-art" role="img" aria-label="A quiet, sunny living space thoughtfully arranged for comfort">
          <ImageWithFallback src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=90" alt="" />
          <div className="hero-art-note"><span className="hero-note-icon"><HeartRegular /></span><span><strong>Made for real life</strong><small>Support that fits your day</small></span></div>
          <div className="hero-sticker"><strong>Everyday</strong><span>can feel<br />a little easier</span></div>
        </div>
        <div className="hero-sun" aria-hidden="true" />
      </section>

      <div className="trust-row">{promises.map((promise) => <span key={promise}><CheckmarkCircleRegular />{promise}</span>)}</div>

      <section className="content-section">
        <div className="section-heading"><div><span className="eyebrow">A good place to start</span><h2>What would help today?</h2><Text>Explore the things that make daily life feel more like yours.</Text></div><Link to="/shop" className="section-link">Browse everything <ArrowRightRegular /></Link></div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Card key={category.id} className={`category-card category-card--${index % 3}`}>
              <Link to={`/shop?category=${category.id}`} className="category-link">
                <CardPreview className="category-preview"><ImageWithFallback src={category.image} alt="" loading="lazy" /></CardPreview>
                <CardHeader header={<span className="category-name">{category.name}</span>} description={<span>{category.description}</span>} />
                <span className="category-arrow" aria-hidden="true"><ArrowRightRegular /></span>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className="editorial-banner">
        <div className="editorial-image"><ImageWithFallback src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=85" alt="Friends enjoying a sunny afternoon together" loading="lazy" /></div>
        <div className="editorial-copy"><Tag shape="rounded">A more flexible way</Tag><Title2>Try it out. Make it yours.</Title2><Text>Some things are easier to choose after living with them. Rent trusted favorites for a day, a week, or a little longer.</Text><Link className="fui-Button fui-Button--primary" to="/rent">Explore rentals <ArrowRightRegular /></Link><span className="editorial-footnote">No pressure. Just a little more room to decide.</span></div>
      </section>

      <section className="content-section featured-section">
        <div className="section-heading"><div><span className="eyebrow">Picked for the little wins</span><Title2>Good things, loved by you</Title2><Text>Thoughtful favorites from people who get it.</Text></div><Link to="/shop" className="section-link">See all products <ArrowRightRegular /></Link></div>
        <div className="product-grid">{products.filter((product) => product.featured).slice(0, 3).map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section>

      <section className="closing-note"><div className="closing-mark"><HeartRegular /></div><div><span className="eyebrow">You’re in good company</span><Title2>Support should feel like support.</Title2><Text>We’re here to help you find what fits—at your pace, on your terms.</Text></div><Link className="fui-Button fui-Button--secondary" to="/account">Meet AccessKart</Link></section>
      <Divider className="home-divider" />
    </main>
  );
}
