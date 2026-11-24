import { useState, type FormEvent } from 'react';
import { Button, Card, Field, Input, Text } from '@fluentui/react-components';
import { Link } from 'react-router-dom';
import { useAuth, getAuthErrorMessage } from '../context/AuthContext';

export function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setSent(false); setBusy(true);
    try { await resetPassword(email); setSent(true); }
    catch (reason) { setError(getAuthErrorMessage(reason)); }
    finally { setBusy(false); }
  }

  return <main className="auth-page"><Card className="auth-card">
    <span className="eyebrow">ACCOUNT RECOVERY</span>
    <h1>Reset your password</h1>
    <Text className="auth-subtitle">Enter the email address associated with your account. Firebase will send a password reset link.</Text>
    <form className="auth-form" onSubmit={submit}>
      <Field label="Email address" required><Input type="email" autoComplete="email" value={email} onChange={(_, data) => setEmail(data.value)} placeholder="you@example.com" required /></Field>
      {error && <div className="auth-error" role="alert">{error}</div>}
      {sent && <div className="auth-success" role="status">If an account exists for this email, a password reset email has been sent.</div>}
      <Button appearance="primary" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send reset link'}</Button>
    </form>
    <Text className="auth-switch"><Link to="/login">Back to sign in</Link></Text>
  </Card></main>;
}
