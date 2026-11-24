import { useState, type FormEvent } from 'react';
import { Button, Card, Field, Input, Text } from '@fluentui/react-components';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, getAuthErrorMessage } from '../context/AuthContext';

export function LoginPage() {
  const { user, signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/account';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to={destination} replace />;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setBusy(true);
    try { await signIn(email, password); navigate(destination, { replace: true }); }
    catch (reason) { setError(getAuthErrorMessage(reason)); }
    finally { setBusy(false); }
  }

  async function google() {
    setError(''); setBusy(true);
    try { await signInWithGoogle(); navigate(destination, { replace: true }); }
    catch (reason) { setError(getAuthErrorMessage(reason)); }
    finally { setBusy(false); }
  }

  return (
    <main className="auth-page">
      <Card className="auth-card">
        <span className="eyebrow">WELCOME BACK</span>
        <h1>Sign in to AccessKart</h1>
        <Text className="auth-subtitle">Your details, saved items and orders in one place.</Text>
        <Button className="google-button" appearance="outline" onClick={google} disabled={busy} type="button">
          <GoogleMark /> Continue with Google
        </Button>
        <div className="auth-divider"><span>or continue with email</span></div>
        <form className="auth-form" onSubmit={submit}>
          <Field label="Email address" required>
            <Input type="email" autoComplete="email" value={email} onChange={(_, data) => setEmail(data.value)} placeholder="you@example.com" required />
          </Field>
          <Field label="Password" required>
            <Input type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(_, data) => setPassword(data.value)} placeholder="Enter your password" required contentAfter={<button className="password-toggle" type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? 'Hide' : 'Show'}</button>} />
          </Field>
          <div className="auth-inline-link"><Link to="/forgot-password">Forgot password?</Link></div>
          {error && <div className="auth-error" role="alert">{error}</div>}
          <Button appearance="primary" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</Button>
        </form>
        <Text className="auth-switch">New to AccessKart? <Link to="/register">Create an account</Link></Text>
      </Card>
    </main>
  );
}

function GoogleMark() {
  return <svg aria-hidden="true" viewBox="0 0 48 48" width="18" height="18"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.91c-.58 2.96-2.26 5.48-4.73 7.18l7.65 5.93c4.47-4.13 7.15-10.2 7.15-17.58Z"/><path fill="#FBBC05" d="M10.54 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.98-6.19Z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.87l-7.65-5.93c-2.13 1.43-4.86 2.28-8.25 2.28-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"/></svg>;
}
