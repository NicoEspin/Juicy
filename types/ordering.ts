import type { StaticImageData } from "next/image";

// ─── Branch (ordering-specific extension of LocationItem) ──────────────────

export interface PaymentMethod {
  id: string;
  name: string;
  enabled: boolean;
  requiresCashAmount?: boolean;
}

export interface TextPromotion {
  kind: "text";
  id: string;
  title: string;
  description: string;
  icon: "delivery" | "discount";
}

export interface ImagePromotion {
  kind: "image";
  id: string;
  image: StaticImageData;
  alt: string;
}

export type Promotion = TextPromotion | ImagePromotion;

export interface Branch {
  id: string;
  slug: string;
  city: string;
  citySlug: string;
  zone: string;
  name: string;
  address: string;
  whatsappNumber: string;
  deliveryEnabled: boolean;
  pickupEnabled: boolean;
  deliveryFee: number;
  estimatedDeliveryTime: string;
  estimatedPickupTime: string;
  schedulingEnabled: boolean;
  paymentMethods: PaymentMethod[];
  promotions: Promotion[];
}

// ─── Catalog ─────────────────────────────────────────────────────────────

export type ProductCategoryId = "burgers" | "combos" | "papas" | "extras" | "bebidas";

export interface Category {
  id: ProductCategoryId;
  label: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  /** Discounted price — when set, `price` renders struck through next to this one. */
  promoPrice?: number;
  available: boolean;
}

export interface ProductIngredient {
  id: string;
  name: string;
  removable: boolean;
  includedByDefault: boolean;
}

export interface CheeseOption {
  id: string;
  name: string;
  priceModifier: number;
  available: boolean;
}

export interface ProductExtra {
  id: string;
  name: string;
  price: number;
  available: boolean;
  maxQuantity: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ProductCategoryId;
  imageAlt: string;
  featured?: boolean;
  badge?: string | null;
  /** Separate from `badge` so a bestseller ribbon and a deal tag can coexist. */
  promoLabel?: string | null;
  available: boolean;
  variants: ProductVariant[];
  ingredients: ProductIngredient[];
  cheeseOptions?: CheeseOption[];
  extras?: ProductExtra[];
}

// ─── Product customization form (product detail overlay) ───────────────────

export interface ProductFormState {
  variantId: string | null;
  removedIngredientIds: string[];
  cheeseOptionId: string | null;
  extraQuantities: Record<string, number>;
  notes: string;
  quantity: number;
}

// ─── Cart ────────────────────────────────────────────────────────────────

export interface CartItemSelectedOption {
  groupId: string;
  optionId: string;
  name: string;
  priceModifier: number;
}

export interface CartItemRemovedIngredient {
  id: string;
  name: string;
}

export interface CartItemExtra {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  branchId: string;
  name: string;
  variant: { id: string; name: string; price: number };
  selectedOptions: CartItemSelectedOption[];
  removedIngredients: CartItemRemovedIngredient[];
  extras: CartItemExtra[];
  notes: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  fingerprint: string;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  version: 1;
  branchId: string | null;
  items: CartItem[];
  updatedAt: string | null;
}

// ─── Checkout ────────────────────────────────────────────────────────────

export type FulfillmentType = "delivery" | "pickup";
export type TimePreference = "asap" | "scheduled";
export type CheckoutStep = "order" | "data" | "confirmation";

export interface CheckoutAddress {
  /** Full address line, e.g. "San Martín 2249" — street and number are one field. */
  street: string;
  floorOrApartment: string;
  neighborhood: string;
  reference: string;
}

export interface CheckoutCustomer {
  fullName: string;
  phone: string;
}

export interface CheckoutDraft {
  version: 1;
  branchId: string;
  currentStep: CheckoutStep;
  fulfillmentType: FulfillmentType;
  customer: CheckoutCustomer;
  address: CheckoutAddress;
  timePreference: TimePreference;
  scheduledDate: string;
  scheduledSlot: string;
  paymentMethodId: string;
  cashAmount: number | null;
  orderNotes: string;
  saveCustomerData: boolean;
  orderReference: string;
  updatedAt: string;
}

export interface CheckoutErrors {
  street?: string;
  neighborhood?: string;
  scheduledDate?: string;
  scheduledSlot?: string;
  fullName?: string;
  phone?: string;
}

export interface OrderTotals {
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export interface SavedOrder {
  version: 1;
  reference: string;
  branchId: string;
  branchName: string;
  items: CartItem[];
  checkout: CheckoutDraft;
  totals: OrderTotals;
  status: "whatsapp-sent-by-user";
  createdAt: string;
}

export interface WhatsappAttempt {
  version: 1;
  orderReference: string;
  branchId: string;
  message: string;
  whatsappUrl: string;
  openedAt: string;
}
