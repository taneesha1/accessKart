import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { api } from '../api';
import { calculateRentalDeposit } from '../api/pricing';
import type { CartItem, Category, Order, Product, Profile } from '../api/types';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CatalogStatus = 'loading' | 'error' | 'empty' | 'data';
type StoreValue = {
  products: Product[];
  categories: Category[];
  orders: Order[];
  profile: Profile;
  cart: CartItem[];
  wishlist: string[];
  comparison: string[];
  catalogStatus: CatalogStatus;
  catalogError: string;
  refresh: () => void;
  updateProfile: (profile: Profile) => Promise<void>;
  addPurchase: (productId: string) => void;
  addRental: (productId: string, days: number) => void;
  updateQuantity: (productId: string, type: CartItem['type'], quantity: number) => void;
  removeCartItem: (productId: string, type: CartItem['type']) => void;
  toggleWishlist: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  placeOrder: (payment: string) => Promise<Order[]>;
  clearCart: () => void;
};

const emptyProfile: Profile = { name: '', email: '', address: '' };
const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useLocalStorage<Order[]>('accesskart-orders', []);
  const [profile, setProfile] = useLocalStorage<Profile>('accesskart-profile', emptyProfile);
  const [cart, setCart] = useLocalStorage<CartItem[]>('accesskart-cart', []);
  const [wishlist, setWishlist] = useLocalStorage<string[]>('accesskart-wishlist', []);
  const [comparison, setComparison] = useLocalStorage<string[]>('accesskart-compare', []);
  const [catalogStatus, setCatalogStatus] = useState<CatalogStatus>('loading');
  const [catalogError, setCatalogError] = useState('');
  const [refreshVersion, setRefreshVersion] = useState(0);

  useEffect(() => {
    let active = true;
    setCatalogStatus('loading');
    Promise.all([api.listProducts(), api.listCategories(), api.getProfile(), api.listOrders()])
      .then(([nextProducts, nextCategories, nextProfile, nextOrders]) => {
        if (!active) return;
        setProducts(nextProducts);
        setCategories(nextCategories);
        if (!window.localStorage.getItem('accesskart-profile') && nextProfile.email) setProfile(nextProfile);
        if (!window.localStorage.getItem('accesskart-orders') && nextOrders.length > 0) setOrders(nextOrders);
        setCatalogError('');
        setCatalogStatus(nextProducts.length ? 'data' : 'empty');
      })
      .catch((error: unknown) => {
        if (!active) return;
        setCatalogError(error instanceof Error ? error.message : 'Something went wrong while loading products.');
        setCatalogStatus('error');
      });
    return () => { active = false; };
  }, [refreshVersion, setOrders, setProfile]);

  const refresh = useCallback(() => setRefreshVersion((version) => version + 1), []);
  const updateProfile = useCallback(async (nextProfile: Profile) => {
    const saved = await api.saveProfile(nextProfile);
    setProfile(saved);
  }, [setProfile]);
  const addPurchase = useCallback((productId: string) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId && item.type === 'purchase');
      return existing
        ? current.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { productId, type: 'purchase', quantity: 1 }];
    });
  }, [setCart]);
  const addRental = useCallback((productId: string, days: number) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId && item.type === 'rental' && item.days === days);
      return existing
        ? current.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { productId, type: 'rental', days, quantity: 1 }];
    });
  }, [setCart]);
  const updateQuantity = useCallback((productId: string, type: CartItem['type'], quantity: number) => {
    setCart((current) => current.map((item) => item.productId === productId && item.type === type ? { ...item, quantity: Math.max(1, quantity) } : item));
  }, [setCart]);
  const removeCartItem = useCallback((productId: string, type: CartItem['type']) => {
    setCart((current) => current.filter((item) => item.productId !== productId || item.type !== type));
  }, [setCart]);
  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) => current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId]);
  }, [setWishlist]);
  const toggleCompare = useCallback((productId: string) => {
    setComparison((current) => current.includes(productId) ? current.filter((id) => id !== productId) : current.length < 3 ? [...current, productId] : current);
  }, [setComparison]);
  const placeOrder = useCallback(async (payment: string) => {
    const created = await api.createOrder({ items: cart, profile, payment });
    setOrders((current) => [...created, ...current]);
    return created;
  }, [cart, profile, setOrders]);
  const clearCart = useCallback(() => setCart([]), [setCart]);

  const value = useMemo<StoreValue>(() => ({
    products, categories, orders, profile, cart, wishlist, comparison, catalogStatus, catalogError, refresh,
    updateProfile, addPurchase, addRental, updateQuantity, removeCartItem, toggleWishlist, toggleCompare, placeOrder, clearCart,
  }), [products, categories, orders, profile, cart, wishlist, comparison, catalogStatus, catalogError, refresh, updateProfile, addPurchase, addRental, updateQuantity, removeCartItem, toggleWishlist, toggleCompare, placeOrder, clearCart]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const value = useContext(StoreContext);
  if (!value) throw new Error('useStore must be used within StoreProvider');
  return value;
}

export function rentalPrice(product: Product, days: number): number {
  if (!product.rentalRates) return 0;
  const { daily, weekly, monthly } = product.rentalRates;
  if (days >= 30 && monthly > 0) return monthly * Math.ceil(days / 30);
  if (days >= 7 && weekly > 0) return weekly * Math.ceil(days / 7);
  return daily * days;
}

export function useCartTotals() {
  const { products, cart } = useStore();
  return useMemo(() => {
    const purchases = cart.filter((item) => item.type === 'purchase');
    const rentals = cart.filter((item) => item.type === 'rental');
    const purchaseSubtotal = purchases.reduce((sum, item) => sum + (products.find((product) => product.id === item.productId)?.price ?? 0) * item.quantity, 0);
    const rentalSubtotal = rentals.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return sum + (product ? rentalPrice(product, item.days ?? 7) : 0) * item.quantity;
    }, 0);
    const deposit = rentals.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return sum + (product ? calculateRentalDeposit(product.price) * item.quantity : 0);
    }, 0);
    return { purchases, rentals, purchaseSubtotal, rentalSubtotal, deposit, total: purchaseSubtotal + rentalSubtotal + deposit };
  }, [products, cart]);
}
