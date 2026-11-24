import { Avatar, Tab, TabList, Text, Toolbar, ToolbarButton } from '@fluentui/react-components';
import { HomeRegular, GridRegular, CalendarRegular, HeartRegular, PersonRegular, CartRegular, AccessibilityRegular, SearchRegular } from '@fluentui/react-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useAuth, getAuthErrorMessage } from '../context/AuthContext';
import { AccessibilityToolbar } from './AccessibilityToolbar';
import { useState } from 'react';

const links = [
  { to: '/', label: 'Home', icon: <HomeRegular /> },
  { to: '/shop', label: 'Shop', icon: <GridRegular /> },
  { to: '/rent', label: 'Rent', icon: <CalendarRegular /> },
  { to: '/compare', label: 'Compare', icon: <GridRegular /> },
  { to: '/wishlist', label: 'Wishlist', icon: <HeartRegular /> },
  { to: '/account', label: 'Account', icon: <PersonRegular /> },
];

type HeaderProps = { darkMode: boolean; onToggleTheme: () => void };

export function Header({ darkMode, onToggleTheme }: HeaderProps) {
  const { cart, comparison, wishlist } = useStore();
  const { user, signOutUser } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [authError, setAuthError] = useState('');

  async function handleSignOut() {
    setAuthError('');
    try { await signOutUser(); navigate('/'); }
    catch (error) { setAuthError(getAuthErrorMessage(error)); }
  }
  const selected = pathname.startsWith('/product') ? '/shop' : links.find((link) => link.to !== '/' && pathname.startsWith(link.to))?.to ?? '/';

  return (
    <>
      <div className="announcement"><span>Thoughtful support for everyday independence</span><span className="announcement-note">Free shipping on every order</span></div>
      <header className="site-header">
        <Toolbar className="site-toolbar" aria-label="Main header">
          <Link to="/" className="brand-lockup" aria-label="AccessKart home">
            <span className="brand-mark" aria-hidden="true">a</span>
            <span className="brand-name">accesskart<span className="brand-period">.</span></span>
          </Link>
          <form className="header-search" action="/shop" role="search" aria-label="Search products">
            <SearchRegular className="search-glyph" aria-hidden="true" />
            <input name="search" type="search" placeholder="What can we help you find?" aria-label="Search products" />
            <button type="submit">Search</button>
          </form>
          <div className="header-actions">
            <ToolbarButton title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={darkMode} onClick={onToggleTheme}><span className="theme-toggle-icon" aria-hidden="true">{darkMode ? '☀' : '☾'}</span></ToolbarButton>
            <ToolbarButton title="Accessibility settings" aria-label="Accessibility settings" icon={<AccessibilityRegular />} onClick={() => setAccessibilityOpen(!accessibilityOpen)} />
            <ToolbarButton title={`Compare ${comparison.length} products`} onClick={() => navigate('/compare')} aria-label={`Compare, ${comparison.length} items`} icon={<GridRegular />} />
            <ToolbarButton title="Your wishlist" onClick={() => navigate('/wishlist')} aria-label={`Wishlist, ${wishlist.length} saved`} icon={<HeartRegular />} />
            <ToolbarButton title="Your shopping cart" onClick={() => navigate('/cart')} aria-label={`Cart, ${cart.length} items`} icon={<CartRegular />} />
            {user ? (
              <>
                <Link to="/account" className="account-shortcut"><Avatar name={user.displayName || user.email || 'Account'} image={user.photoURL ? { src: user.photoURL } : undefined} size={32} color="brand" /><span className="account-shortcut-name">{(user.displayName || user.email || 'Account').split(' ')[0]}</span></Link>
                <ToolbarButton title="Sign out" aria-label="Sign out" onClick={handleSignOut}>Sign out</ToolbarButton>
              </>
            ) : (
              <Link to="/login" className="account-shortcut"><Avatar name="Guest" size={32} color="brand" /><span className="account-shortcut-name">Sign in</span></Link>
            )}
          </div>
        </Toolbar>
        <nav className="desktop-nav" aria-label="Main navigation">
          <TabList selectedValue={selected} appearance="subtle" onTabSelect={(_, data) => navigate(String(data.value))}>
            {links.map((link) => <Tab key={link.to} value={link.to} icon={link.icon}>{link.label}</Tab>)}
          </TabList>
          <div className="nav-note"><Text size={200}>Here for the little things and the big days.</Text></div>
        </nav>
      </header>
      {authError && <div className="auth-header-error" role="alert">{authError}</div>}
      {accessibilityOpen && <div className="toolbar-popover"><AccessibilityToolbar /></div>}
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div><Link to="/" className="brand-lockup footer-brand"><span className="brand-mark" aria-hidden="true">a</span><span className="brand-name">accesskart<span className="brand-period">.</span></span></Link><Text size={200} className="footer-copy">Better days, made a little easier.</Text></div>
        <div className="footer-links"><Link to="/shop">Shop all</Link><Link to="/rent">Rentals</Link><Link to="/account">My account</Link></div>
        <Text size={200} className="footer-copy">© 2026 AccessKart</Text>
      </div>
    </footer>
  );
}
