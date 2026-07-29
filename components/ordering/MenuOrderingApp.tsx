"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BottomNav } from "@/components/ordering/BottomNav";
import { BranchChangeDialog } from "@/components/ordering/BranchChangeDialog";
import { BranchSheet } from "@/components/ordering/BranchSheet";
import { CartBar } from "@/components/ordering/CartBar";
import { CategoryTabs } from "@/components/ordering/CategoryTabs";
import { CheckoutOverlay } from "@/components/ordering/checkout/CheckoutOverlay";
import { useCart } from "@/components/ordering/hooks/useCart";
import { useCheckoutDraft } from "@/components/ordering/hooks/useCheckoutDraft";
import { useFavorites } from "@/components/ordering/hooks/useFavorites";
import { useProductForm } from "@/components/ordering/hooks/useProductForm";
import { MenuCatalog } from "@/components/ordering/MenuCatalog";
import { OrderingHeader } from "@/components/ordering/OrderingHeader";
import { OrderSentScreen } from "@/components/ordering/OrderSentScreen";
import { ProductDetailOverlay } from "@/components/ordering/ProductDetailOverlay";
import { PromoBanner } from "@/components/ordering/PromoBanner";
import { SearchBar } from "@/components/ordering/SearchBar";
import { SearchResults } from "@/components/ordering/SearchResults";
import { Toast } from "@/components/ordering/Toast";
import { WhatsappReturnDialog } from "@/components/ordering/WhatsappReturnDialog";
import { formatMoney } from "@/lib/ordering/money";
import { calculateSubtotal } from "@/lib/ordering/pricing";
import type { Branch, CartItem, Category, Product, ProductCategoryId, SavedOrder } from "@/types/ordering";

interface MenuOrderingAppProps {
  branch: Branch;
  branches: Branch[];
  categories: Category[];
  products: Product[];
}

export function MenuOrderingApp({ branch, branches, categories, products }: MenuOrderingAppProps) {
  const router = useRouter();
  const cart = useCart(branch.id);
  const favorites = useFavorites();

  const [activeCategory, setActiveCategory] = useState<ProductCategoryId>(categories[0]?.id ?? "burgers");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Measured live so the sticky category bar always docks right below the header,
  // regardless of how tall the header ends up being (logo image, wrapping, etc.).
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    // Measure synchronously right after mount so the first paint is already correct,
    // then keep watching in case the header's height changes later (font load, wrap, etc).
    setHeaderHeight(node.getBoundingClientRect().height);

    const observer = new ResizeObserver((entries) => {
      setHeaderHeight(entries[0].contentRect.height);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const productForm = useProductForm(activeProduct ?? undefined, editingItem ?? undefined);

  const [showBranchSheet, setShowBranchSheet] = useState(false);
  const [pendingBranch, setPendingBranch] = useState<Branch | null>(null);
  const [orderSentReference, setOrderSentReference] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastMessage(message);
    toastTimerRef.current = setTimeout(() => setToastMessage(""), 1800);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const handleOrderSent = useCallback(
    (order: SavedOrder) => {
      cart.clear();
      setOrderSentReference(order.reference);
    },
    [cart],
  );

  const checkout = useCheckoutDraft(branch, cart.cart, handleOrderSent);

  const selectCategory = useCallback((categoryId: ProductCategoryId) => {
    setActiveCategory(categoryId);
    document.getElementById(`section-${categoryId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const openProductDetail = useCallback((product: Product, item?: CartItem) => {
    setActiveProduct(product);
    setEditingItem(item ?? null);
  }, []);

  const closeProductDetail = useCallback(() => {
    setActiveProduct(null);
    setEditingItem(null);
  }, []);

  const handleEditCartItem = useCallback(
    (item: CartItem) => {
      const product = products.find((candidate) => candidate.slug === item.productSlug);
      if (!product) return;
      checkout.closeCheckout();
      openProductDetail(product, item);
    },
    [checkout, openProductDetail, products],
  );

  const handleSubmitProduct = useCallback(() => {
    if (!activeProduct || !productForm.form) return;
    if (!productForm.form.variantId) {
      productForm.setVariantError(true);
      document.getElementById("section-variant")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setIsAddingProduct(true);
    setTimeout(() => {
      cart.addOrUpdate(activeProduct, productForm.form!, editingItem?.id ?? null);
      showToast(`${activeProduct.name} agregada a tu pedido.`);
      setIsAddingProduct(false);
      closeProductDetail();
    }, 350);
  }, [activeProduct, cart, closeProductDetail, editingItem, productForm, showToast]);

  const handleSelectBranch = useCallback(
    (target: Branch) => {
      if (target.id === branch.id) return;
      if (cart.cart.items.length > 0) {
        setPendingBranch(target);
        return;
      }
      setShowBranchSheet(false);
      router.push(`/sucursales/${target.slug}`);
    },
    [branch.id, cart.cart.items.length, router],
  );

  const confirmBranchChange = useCallback(() => {
    cart.clear();
    setShowBranchSheet(false);
    const target = pendingBranch;
    setPendingBranch(null);
    if (target) router.push(`/sucursales/${target.slug}`);
  }, [cart, pendingBranch, router]);

  const handleGoToOrder = useCallback(() => {
    if (!checkout.openCheckout()) showToast("Tu carrito está vacío.");
  }, [checkout, showToast]);

  const query = searchQuery.trim().toLowerCase();
  const isSearching = query.length > 0;
  const searchResults = isSearching
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
    : [];

  const cartQty = cart.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalLabel = formatMoney(calculateSubtotal(cart.cart));
  const isFavorite = activeProduct ? favorites.favorites.includes(activeProduct.id) : false;

  const categoriesWithPromo = new Set<ProductCategoryId>(
    products
      .filter((product) => product.promoLabel || product.variants.some((variant) => variant.promoPrice))
      .map((product) => product.category),
  );

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-2xl bg-juicy-cream lg:max-w-5xl">
      <OrderingHeader
        ref={headerRef}
        branchLabel={`${branch.city} · ${branch.zone}`}
        onOpenBranchSheet={() => setShowBranchSheet(true)}
        onProfileClick={() => showToast("Perfil — próximamente")}
      />

      <PromoBanner promotions={branch.promotions} />

      <SearchBar onSearchChange={setSearchQuery} searchQuery={searchQuery} />

      {!isSearching && (
        <CategoryTabs
          activeCategory={activeCategory}
          categories={categories}
          categoriesWithPromo={categoriesWithPromo}
          onSelect={selectCategory}
          stickyTop={headerHeight}
        />
      )}

      {isSearching ? (
        <SearchResults onOpenDetail={openProductDetail} query={searchQuery} results={searchResults} />
      ) : (
        <MenuCatalog categories={categories} onOpenDetail={openProductDetail} products={products} />
      )}

      <CartBar onOpenOrder={handleGoToOrder} quantity={cartQty} totalLabel={cartTotalLabel} />

      <BottomNav
        items={[
          { icon: "home", label: "Inicio", isActive: true, onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
          { icon: "orders", label: "Pedidos", isActive: false, onClick: () => showToast("Pedidos — próximamente") },
          {
            icon: "favorites",
            label: "Favoritos",
            isActive: false,
            onClick: () => showToast("Favoritos — próximamente"),
          },
          { icon: "profile", label: "Perfil", isActive: false, onClick: () => showToast("Perfil — próximamente") },
        ]}
      />

      <Toast message={toastMessage} />

      {activeProduct && productForm.form && (
        <ProductDetailOverlay
          form={productForm.form}
          isAdding={isAddingProduct}
          isEditing={!!editingItem}
          isFavorite={isFavorite}
          onChangeExtraQty={productForm.changeExtraQty}
          onChangeQuantity={productForm.changeQuantity}
          onClose={closeProductDetail}
          onNotesChange={productForm.setNotes}
          onSelectCheese={productForm.selectCheese}
          onSelectVariant={productForm.selectVariant}
          onSubmit={handleSubmitProduct}
          onToggleFavorite={() => favorites.toggle(activeProduct.id)}
          onToggleIngredient={productForm.toggleIngredient}
          product={activeProduct}
          variantError={productForm.variantError}
        />
      )}

      {checkout.draft && (
        <CheckoutOverlay
          branch={branch}
          cart={cart.cart}
          checkout={checkout}
          onChangeQty={cart.changeQuantity}
          onEditItem={handleEditCartItem}
          onOpenBranchSheet={() => setShowBranchSheet(true)}
          onRemoveItem={cart.removeItem}
        />
      )}

      {checkout.showWhatsappReturnDialog && (
        <WhatsappReturnDialog
          onConfirmSent={checkout.confirmWhatsappSent}
          onKeepEditing={checkout.keepEditingOrder}
          onReopen={checkout.reopenWhatsapp}
        />
      )}

      {orderSentReference && (
        <OrderSentScreen onClose={() => setOrderSentReference(null)} orderReference={orderSentReference} />
      )}

      {showBranchSheet && (
        <BranchSheet
          branches={branches}
          currentBranchId={branch.id}
          onClose={() => setShowBranchSheet(false)}
          onSelectBranch={handleSelectBranch}
        />
      )}

      {pendingBranch && <BranchChangeDialog onCancel={() => setPendingBranch(null)} onConfirm={confirmBranchChange} />}
    </div>
  );
}
