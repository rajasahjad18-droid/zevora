
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { ShoppingCart, Trash2, ArrowRight } from "lucide-react";

import Navbar from "./components/Navbar";
import AnnouncementBar from "./components/AnnouncementBar";
import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import DealSection from "./components/DealSection";
import Footer from "./components/Footer";

import ShopSection, {
  products,
} from "./components/ShopSection";

import WishlistSection from "./components/WishlistSection";
import BecomeSeller from "./components/BecomeSeller";
import JoinZevora from "./JoinZevora";

// HOME PAGE

function Home({
  selectedCategory,
  setSelectedCategory,
  wishlist,
  cart,
  toggleWishlist,
  addToCart,
}) {
  return (
    <>
      <Hero onCategorySelect={setSelectedCategory} />

      <CategorySection
        onCategorySelect={setSelectedCategory}
      />

      <DealSection />

      <ShopSection
        selectedCategory={selectedCategory}
        wishlist={wishlist}
        cart={cart}
        onToggleWishlist={toggleWishlist}
        onAddToCart={addToCart}
      />

      <JoinZevora />
    </>
  );
}

// SEARCH PAGE

function SearchPage({
  wishlist,
  cart,
  toggleWishlist,
  addToCart,
}) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <ShopSection
      selectedCategory="All Products"
      searchQuery={query}
      wishlist={wishlist}
      cart={cart}
      onToggleWishlist={toggleWishlist}
      onAddToCart={addToCart}
    />
  );
}

// CART PAGE

function CartPage({ cart, removeFromCart }) {
  const navigate = useNavigate();

  const cartProducts = products.filter((product) =>
    cart.includes(product.id)
  );

  const totalPrice = cartProducts.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <main className="min-h-screen bg-[#fffaf2] px-4 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[4px] text-[#d95b32]">
            ZE VORA SHOPPING
          </p>

          <h1 className="text-3xl font-bold text-[#064b46] md:text-5xl">
            My Shopping Cart
          </h1>

          <p className="mt-3 text-gray-500">
            Review your selected products.
          </p>
        </div>

        {cartProducts.length === 0 ? (
          <div className="rounded-2xl bg-white px-5 py-16 text-center shadow-sm">
            <ShoppingCart
              size={55}
              className="mx-auto mb-5 text-[#064b46]"
            />

            <h2 className="text-2xl font-bold text-[#064b46]">
              Your Cart is Empty
            </h2>

            <p className="mt-3 text-gray-500">
              You haven't added any products yet.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-7 rounded-xl bg-[#064b46] px-7 py-3 font-bold text-white transition hover:bg-[#d95b32]"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cartProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-24 rounded-xl object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase text-[#d95b32]">
                      {product.category}
                    </p>

                    <h3 className="mt-1 font-bold text-[#064b46]">
                      {product.name}
                    </h3>

                    <p className="mt-2 font-bold text-[#064b46]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="rounded-full bg-red-50 p-3 text-red-500 transition hover:bg-red-100"
                    aria-label="Remove product"
                  >
                    <Trash2 size={19} />
                  </button>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#064b46]">
                Order Summary
              </h2>

              <div className="mt-6 flex justify-between text-gray-600">
                <span>Total Items</span>
                <span>{cartProducts.length}</span>
              </div>

              <div className="mt-4 flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="font-semibold text-green-600">
                  Calculated later
                </span>
              </div>

              <div className="my-5 border-t border-gray-100" />

              <div className="flex justify-between text-lg font-bold text-[#064b46]">
                <span>Subtotal</span>
                <span>
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                onClick={() =>
                  alert("Checkout page will be connected next.")
                }
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#064b46] px-5 py-4 font-bold text-white transition hover:bg-[#d95b32]"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// MAIN APP CONTENT

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] =
    useState("All Products");

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const addToCart = (id) => {
    setCart((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item !== id)
    );
  };

  const handleSearch = (query) => {
    const search = query.trim();

    if (!search) return;

    navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    navigate("/shop");
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [location.pathname, location.search]);

  return (
    <>
      <AnnouncementBar />

      <Navbar
        wishlistCount={wishlist.length}
        cartCount={cart.length}
        onSearch={handleSearch}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              selectedCategory={selectedCategory}
              setSelectedCategory={handleCategorySelect}
              wishlist={wishlist}
              cart={cart}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/shop"
          element={
            <ShopSection
              selectedCategory={selectedCategory}
              wishlist={wishlist}
              cart={cart}
              onToggleWishlist={toggleWishlist}
              onAddToCart={addToCart}
            />
          }
        />

        <Route
          path="/search"
          element={
            <SearchPage
              wishlist={wishlist}
              cart={cart}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/categories"
          element={
            <CategorySection
              onCategorySelect={handleCategorySelect}
            />
          }
        />

        <Route
          path="/deals"
          element={<DealSection />}
        />

        <Route
          path="/wishlist"
          element={
            <WishlistSection
              wishlist={wishlist}
              products={products}
              cart={cart}
              onRemove={toggleWishlist}
              onAddToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route
          path="/seller"
          element={<BecomeSeller />}
        />

        <Route
          path="/join"
          element={<JoinZevora />}
        />

        <Route
          path="*"
          element={
            <div className="min-h-screen bg-[#fffaf2] px-5 py-20 text-center">
              <h1 className="text-5xl font-bold text-[#064b46]">
                404
              </h1>

              <h2 className="mt-4 text-2xl font-bold text-[#064b46]">
                Page Not Found
              </h2>

              <p className="mt-3 text-gray-500">
                The page you are looking for does not exist.
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-7 rounded-xl bg-[#064b46] px-7 py-3 font-bold text-white"
              >
                Back to Home
              </button>
            </div>
          }
        />
      </Routes>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

// APP

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
