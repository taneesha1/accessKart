import type { ApiClient, CreateOrderInput, Order, Product } from './types';
import { calculateRentalDeposit } from './pricing';
import { getPreviewState } from './previewState';
import { categories, products, sampleOrders, sampleProfile } from '../mocks/data';

async function respond<T>(value: T, emptyValue: T): Promise<T> {
  const state = getPreviewState();
  if (state === 'loading') return new Promise<T>(() => undefined);
  if (state === 'error') throw new Error('We could not load your AccessKart data. Please try again.');
  await new Promise((resolve) => window.setTimeout(resolve, 90));
  return state === 'empty' ? emptyValue : value;
}

export const mockClient: ApiClient = {
  listProducts: () => respond(products, []),
  getProduct: (id) => respond(products.find((product) => product.id === id) ?? null, null),
  listCategories: () => respond(categories, []),
  getProfile: () => respond(sampleProfile, { name: '', email: '', address: '' }),
  saveProfile: async (profile) => respond(profile, { name: '', email: '', address: '' }),
  listOrders: () => respond(sampleOrders, []),
  createOrder: async (input: CreateOrderInput) => {
    const orders: Order[] = input.items.map((item, index) => {
      const product = products.find((entry) => entry.id === item.productId);
      const total = item.type === 'purchase'
        ? (product?.price ?? 0) * item.quantity
        : rentalTotal(product, item.days ?? 7) * item.quantity + (product ? calculateRentalDeposit(product.price) * item.quantity : 0);
      return {
        id: `AK-${Date.now().toString().slice(-5)}${index}`,
        type: item.type === 'purchase' ? 'Purchase' : 'Rental',
        date: new Date().toISOString(),
        status: item.type === 'purchase' ? 'Preparing' : 'Scheduled',
        total,
        items: product ? [product.name] : [],
      };
    });
    void input.profile;
    void input.payment;
    return respond(orders, []);
  },
};

function rentalTotal(product: Product | undefined, days: number): number {
  if (!product?.rentalRates) return 0;
  const { daily, weekly, monthly } = product.rentalRates;
  if (days >= 30 && monthly > 0) return monthly * Math.ceil(days / 30);
  if (days >= 7 && weekly > 0) return weekly * Math.ceil(days / 7);
  return daily * days;
}
