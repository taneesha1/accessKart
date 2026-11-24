import { useEffect, useState } from 'react';
import { FluentProvider, Text } from '@fluentui/react-components';
import { ArrowRightRegular } from '@fluentui/react-icons';
import { BrowserRouter, Link, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { Header, Footer } from './components/Header';
import { CatalogGate } from './components/StatePanel';
import { PreviewStateSwitcher } from './components/PreviewStateSwitcher';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { appLightTheme, appDarkTheme } from './theme';
import { HomePage } from './pages/Home';
import { ShopPage } from './pages/Shop';
import { ProductDetailPage } from './pages/ProductDetail';
import { RentPage } from './pages/Rent';
import { ComparePage } from './pages/Compare';
import { CartPage } from './pages/Cart';
import { CheckoutPage } from './pages/Checkout';
import { OrderConfirmationPage } from './pages/OrderConfirmation';
import { WishlistPage } from './pages/Wishlist';
import { AccountPage } from './pages/Account';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { ForgotPasswordPage } from './pages/ForgotPassword';

function AppLayout({ darkMode, onToggleTheme }: { darkMode: boolean; onToggleTheme: () => void }) {
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);
  return <div className="app-frame">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header darkMode={darkMode} onToggleTheme={onToggleTheme} />
    <div className="layout-accessibility-toolbar"><AccessibilityToolbar /></div>
    <div id="main-content">{isAuthPage ? <Outlet /> : <CatalogGate><Outlet /></CatalogGate>}</div>
    <Footer />
    <PreviewStateSwitcher />
    <div className="sr-only" aria-live="polite" aria-atomic="true">AccessKart is ready.</div>
  </div>;
}

function NotFound() {
  return <main className="page-main"><div className="empty-panel"><span className="eyebrow">A small detour</span><h1>That page isn’t here</h1><Text>Let’s get you back to the good stuff.</Text><Link className="fui-Button fui-Button--primary" to="/" aria-label="Back to home"><ArrowRightRegular /> Back to home</Link></div></main>;
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => window.localStorage.getItem('accesskart-theme') === 'dark');

  useEffect(() => {
    window.localStorage.setItem('accesskart-theme', darkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return <FluentProvider theme={darkMode ? appDarkTheme : appLightTheme} className="fluent-app">
    <BrowserRouter>
      <AuthProvider>
        <AccessibilityProvider>
          <StoreProvider>
            <Routes>
              <Route element={<AppLayout darkMode={darkMode} onToggleTheme={() => setDarkMode((value) => !value)} />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/rent" element={<RentPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
                  <Route path="/account" element={<AccountPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </StoreProvider>
        </AccessibilityProvider>
      </AuthProvider>
    </BrowserRouter>
  </FluentProvider>;
}
