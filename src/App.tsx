import { FluentProvider, Text } from '@fluentui/react-components';
import { ArrowRightRegular } from '@fluentui/react-icons';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { StoreProvider } from './context/StoreContext';
import { Header, Footer } from './components/Header';
import { CatalogGate } from './components/StatePanel';
import { PreviewStateSwitcher } from './components/PreviewStateSwitcher';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { appTheme } from './theme';
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

function AppLayout() {
  return (
    <div className="app-frame">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <div className="layout-accessibility-toolbar"><AccessibilityToolbar /></div>
      <div id="main-content"><CatalogGate><Outlet /></CatalogGate></div>
      <Footer />
      <PreviewStateSwitcher />
      <div className="sr-only" aria-live="polite" aria-atomic="true">AccessKart is ready.</div>
    </div>
  );
}

function NotFound() {
  return <main className="page-main"><div className="empty-panel"><span className="eyebrow">A small detour</span><h1>That page isn’t here</h1><Text>Let’s get you back to the good stuff.</Text><Link className="fui-Button fui-Button--primary" to="/" aria-label="Back to home"><ArrowRightRegular /> Back to home</Link></div></main>;
}

export default function App() {
  return <FluentProvider theme={appTheme} className="fluent-app">
    <BrowserRouter>
      <AccessibilityProvider>
        <StoreProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/rent" element={<RentPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </StoreProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  </FluentProvider>;
}
