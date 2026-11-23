import { Button, Card, Field, Input, Radio, RadioGroup, Text } from '@fluentui/react-components';
import { ArrowLeftRegular, LockClosedRegular } from '@fluentui/react-icons';
import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../components/ProductCard';
import { PageIntro } from '../components/PageIntro';
import { OrderSummary } from '../components/OrderSummary';
import { useCartTotals, useStore } from '../context/StoreContext';

const paymentOptions = [
  { value: 'card', title: 'Card', note: 'Demo card · amount shown in INR' },
  { value: 'upi', title: 'UPI', note: 'Demo UPI · amount shown in INR' },
  { value: 'cod', title: 'Cash on delivery', note: 'Pay when your order arrives' },
  { value: 'approval', title: 'Purchase on approval', note: 'A team member will help you arrange it' },
];

export function CheckoutPage() {
  const { profile, updateProfile, placeOrder, cart } = useStore();
  const totals = useCartTotals();
  const navigate = useNavigate();
  const [form, setForm] = useState(profile);
  const [payment, setPayment] = useState('card');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  if (!cart.length) return <Navigate to="/cart" replace />;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await updateProfile(form);
      const orders = await placeOrder(payment);
      if (!orders.length) throw new Error('Your demo order could not be created. Please try again.');
      navigate(`/order-confirmation/${orders[0].id}`, { state: { ids: orders.map((order) => order.id) } });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Something went wrong while placing your order.');
    } finally {
      setSubmitting(false);
    }
  }

  function updateField(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <main className="page-main checkout-main">
      <PageIntro eyebrow="Just a few details" title="Let’s get this to you" description="This is a demo checkout. Nothing will be charged and no payment details are stored." />
      <form className="checkout-layout" onSubmit={submit}>
        <div className="checkout-form-column">
          <Card className="checkout-card">
            <div className="checkout-card-heading"><span className="checkout-number">1</span><div><h2>Where should we send it?</h2><Text size={200}>A good place for your order to land.</Text></div></div>
            <div className="checkout-fields">
              <Field label="Full name" required><Input autoComplete="name" required value={form.name} onChange={(_, data) => updateField('name', data.value)} placeholder="Your name" /></Field>
              <Field label="Email address" required><Input type="email" autoComplete="email" required value={form.email} onChange={(_, data) => updateField('email', data.value)} placeholder="you@example.com" /></Field>
              <Field label="Delivery address" required><Input autoComplete="street-address" required value={form.address} onChange={(_, data) => updateField('address', data.value)} placeholder="Street, city, state" /></Field>
            </div>
          </Card>
          <Card className="checkout-card">
            <div className="checkout-card-heading"><span className="checkout-number">2</span><div><h2>How would you like to pay?</h2><Text size={200}>Choose a demo option. No real payment is processed.</Text></div></div>
            <RadioGroup value={payment} onChange={(_, data) => setPayment(data.value)} className="payment-options" aria-label="Demo payment method">
              {paymentOptions.map((option) => <label key={option.value} className={`payment-option${payment === option.value ? ' payment-option--selected' : ''}`}><Radio value={option.value} /><span><strong>{option.title}</strong><small>{option.note}</small></span></label>)}
            </RadioGroup>
          </Card>
          {error && <div className="checkout-error" role="alert">{error}</div>}
          <div className="checkout-actions"><Link className="fui-Button fui-Button--secondary" to="/cart"><ArrowLeftRegular /> Back to cart</Link><Button appearance="primary" type="submit" icon={<LockClosedRegular />} disabled={submitting}>{submitting ? 'Placing your demo order…' : `Place demo order · ${formatCurrency(totals.total)}`}</Button></div>
        </div>
        <aside className="checkout-summary"><OrderSummary checkout /><Card className="checkout-help"><strong>A real person, when you need one.</strong><Text size={200}>Questions about what you need? Our care team is here to help you choose.</Text><Link to="/account">Get in touch</Link></Card></aside>
      </form>
    </main>
  );
}
