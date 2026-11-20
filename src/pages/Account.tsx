import { Button, Card, Field, Input, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Text, Title2 } from '@fluentui/react-components';
import { CheckmarkRegular, PersonRegular } from '@fluentui/react-icons';
import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { PageIntro } from '../components/PageIntro';
import { formatCurrency } from '../components/ProductCard';
import { useAccessibility } from '../context/AccessibilityContext';
import { useStore } from '../context/StoreContext';
import type { Profile } from '../api/types';

export function AccountPage() {
  const { profile, updateProfile, orders } = useStore();
  const { preferences, reset } = useAccessibility();
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => setForm(profile), [profile]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSaved(false);
    try {
      await updateProfile(form);
      setSaved(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Your profile could not be saved.');
    }
  }

  function updateField(key: keyof Profile, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  const purchaseOrders = orders.filter((order) => order.type === 'Purchase');
  const rentalOrders = orders.filter((order) => order.type === 'Rental');
  return (
    <main className="page-main account-main">
      <PageIntro eyebrow="Your AccessKart" title={`Good to see you${profile.name ? `, ${profile.name.split(' ')[0]}` : ''}.`} description="A place for your details, your choices, and everything you’ve ordered." />
      <div className="account-grid">
        <Card className="profile-card"><div className="account-card-heading"><span className="account-avatar"><PersonRegular /></span><div><h2>Your details</h2><Text size={200}>Keep things up to date, whenever you like.</Text></div></div>
          <form onSubmit={submit} className="profile-form">
            <Field label="Full name" required><Input autoComplete="name" required value={form.name} onChange={(_, data) => updateField('name', data.value)} /></Field>
            <Field label="Email address" required><Input type="email" autoComplete="email" required value={form.email} onChange={(_, data) => updateField('email', data.value)} /></Field>
            <Field label="Default delivery address"><Input autoComplete="street-address" value={form.address} onChange={(_, data) => updateField('address', data.value)} /></Field>
            {error && <span role="alert" className="form-feedback form-feedback--error">{error}</span>}
            {saved && <span role="status" className="form-feedback"><CheckmarkRegular /> Your details are saved.</span>}
            <Button appearance="primary" type="submit">Save my details</Button>
          </form>
        </Card>
        <Card className="preferences-card"><div className="account-card-heading"><span className="account-avatar preferences-avatar">Aa</span><div><h2>How you like to browse</h2><Text size={200}>Your comfort settings stay with you.</Text></div></div>
          <div className="preference-summary"><div><span>Text size</span><strong>{Math.round(preferences.fontScale * 100)}%</strong></div><div><span>High contrast</span><strong>{preferences.highContrast ? 'On' : 'Off'}</strong></div><div><span>Grayscale</span><strong>{preferences.grayscale ? 'On' : 'Off'}</strong></div><div><span>Underlined links</span><strong>{preferences.underlineLinks ? 'On' : 'Off'}</strong></div></div>
          <Button appearance="secondary" onClick={reset}>Reset accessibility settings</Button><Text size={200} className="preference-hint">Use the accessibility controls in the header to adjust these settings.</Text>
        </Card>
      </div>
      <section className="order-history-section"><div className="section-heading"><div><span className="eyebrow">A little history</span><Title2>Your orders</Title2></div><Text>{orders.length} total</Text></div>
        <OrderHistory title="Purchase orders" orders={purchaseOrders} empty="Your purchases will show up here." />
        <OrderHistory title="Rental orders" orders={rentalOrders} empty="Any rentals you book will be easy to find here." />
      </section>
    </main>
  );
}

function OrderHistory({ title, orders, empty }: { title: string; orders: ReturnType<typeof useStore>['orders']; empty: string }) {
  return <section className="history-group"><div className="history-heading"><h3>{title}</h3>{!orders.length && <Link to="/shop">Explore the collection</Link>}</div>
    {orders.length ? <div className="table-scroll"><Table aria-label={title}><TableHeader><TableRow><TableHeaderCell>Order</TableHeaderCell><TableHeaderCell>Date</TableHeaderCell><TableHeaderCell>What’s happening</TableHeaderCell><TableHeaderCell>Total</TableHeaderCell></TableRow></TableHeader><TableBody>{orders.map((order) => <TableRow key={order.id}><TableCell><Link to={`/order-confirmation/${order.id}`}>{order.id}</Link></TableCell><TableCell>{order.date}</TableCell><TableCell>{order.status}</TableCell><TableCell>{formatCurrency(order.total)}</TableCell></TableRow>)}</TableBody></Table></div> : <Card className="history-empty"><Text>{empty}</Text></Card>}
  </section>;
}
