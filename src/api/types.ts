export type RentalRate = { daily: number; weekly: number; monthly: number };

export type Product = {
  id: string;
  name: string;
  category: string;
  categoryId: string;
  vendor: string;
  price: number;
  rentalRates: RentalRate | null;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  specs: Record<string, string>;
  primaryUse: string;
  weight: string;
  featured?: boolean;
};

export type Category = { id: string; name: string; description: string; image: string };
export type Profile = { name: string; email: string; address: string };
export type Order = { id: string; type: 'Purchase' | 'Rental'; date: string; status: string; total: number; items: string[] };
export type CreateOrderInput = { items: CartItem[]; profile: Profile; payment: string };
export type CartItem = { productId: string; type: 'purchase' | 'rental'; quantity: number; days?: number };
export type ApiClient = {
  listProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | null>;
  listCategories(): Promise<Category[]>;
  getProfile(): Promise<Profile>;
  saveProfile(profile: Profile): Promise<Profile>;
  listOrders(): Promise<Order[]>;
  createOrder(input: CreateOrderInput): Promise<Order[]>;
};
