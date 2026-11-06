
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { supabase } from "./supabase";
import { motion, AnimatePresence } from "framer-motion";

import {
  Search, Heart, ShoppingCart, UserRound, Menu, ChevronDown,
  Store, House, ShoppingBag, Grid2X2, Flame, X, LogOut,
  Mail, Lock, Eye, EyeOff, User, Loader2,
} from "lucide-react";

const Navbar = ({ wishlistCount = 0, cartCount = 0, onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  const goToPage = (path) => {
    navigate(path);
    setMenuOpen(false);
    setAccountOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    if (!query) return;

    if (onSearch) onSearch(query);
    else navigate(`/search?q=${encodeURIComponent(query)}`);

    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openAuth = (mode = "login") => {
    setAuthMode(mode);
    setAuthModal(true);
    setAccountOpen(false);
    setMenuOpen(false);
    setError("");
    setMessage("");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (authMode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });

        if (error) throw error;

        if (!data.session) {
          setMessage("Account created! Please check your email and confirm your account.");
        } else {
          setMessage("Welcome to ZE VORA!");
          setAuthModal(false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setMessage("Login successful!");
        setAuthModal(false);
      }

      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setError("Please enter your email address first.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });

    if (error) setError(error.message);
    else setMessage("Password reset link sent. Check your email.");

    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setUser(null);
    setAccountOpen(false);
    setMessage("You have been logged out.");
  };

  const navItems = [
    { name: "Home", path: "/", icon: House },
    { name: "Shop", path: "/shop", icon: ShoppingBag },
    { name: "Categories", path: "/categories", icon: Grid2X2 },
    { name: "Deals", path: "/deals", icon: Flame },
    { name: "Become a Seller", path: "/seller", icon: Store },
  ];

  const iconHover = {
    whileHover: { y: -3, scale: 1.06 },
    whileTap: { scale: 0.92 },
    transition: { type: "spring", stiffness: 350, damping: 15 },
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full shadow-md"
    >
      {/* MAIN NAVBAR */}
      <div className="bg-[#064b46] px-3 py-3 sm:px-5 md:px-8 md:py-4">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-x-3 gap-y-3">

          {/* LOGO */}
          <motion.button
            onClick={() => goToPage("/")}
            whileTap={{ scale: 0.96 }}
            className="flex min-w-0 shrink items-center gap-1.5 text-left sm:gap-2"
          >
            <img
              src={logo}
              alt="ZEVORA Logo"
              className="h-10 w-11 shrink-0 object-contain sm:h-12 sm:w-14 md:h-14 md:w-16"
            />
            <div className="min-w-0">
              <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl md:text-4xl">
                ZEVORA<span className="text-[#ff6038]">.</span>
              </h1>
              <p className="hidden text-[10px] font-medium text-white sm:block sm:text-xs">
                Discover More. Shop Better.
              </p>
            </div>
          </motion.button>

          {/* RIGHT ICONS */}
          <div className="ml-auto flex shrink-0 items-center gap-3 text-white sm:gap-5 md:gap-7">

            {/* WISHLIST */}
            <motion.button
              {...iconHover}
              onClick={() => goToPage("/wishlist")}
              className="relative flex flex-col items-center"
              aria-label="Open Wishlist"
            >
              <Heart size={23} className="sm:h-7 sm:w-7" />
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff6038] px-1 text-[10px] sm:h-5 sm:min-w-5 sm:text-xs">
                {wishlistCount}
              </span>
              <span className="hidden text-xs sm:block">Wishlist</span>
            </motion.button>

            {/* ACCOUNT */}
            <div className="relative">
              <motion.button
                {...iconHover}
                onClick={() => {
                  if (user) setAccountOpen((prev) => !prev);
                  else openAuth("login");
                }}
                className="flex flex-col items-center"
                aria-label="Account"
              >
                <UserRound size={23} className="sm:h-7 sm:w-7" />
                <span className="hidden items-center gap-1 text-xs sm:flex">
                  {user ? "My Account" : "Account"}
                  <ChevronDown size={12} />
                </span>
              </motion.button>

              <AnimatePresence>
                {accountOpen && user && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-12 z-50 w-64 rounded-2xl border border-gray-200 bg-white p-4 text-gray-800 shadow-2xl sm:top-16"
                  >
                    <div className="mb-3 border-b pb-3">
                      <p className="font-bold text-[#064b46]">
                        {user.user_metadata?.full_name || "Welcome!"}
                      </p>
                      <p className="break-all text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>

                    <button
                      onClick={() => goToPage("/wishlist")}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-gray-100"
                    >
                      <Heart size={19} /> My Wishlist
                    </button>

                    <button
                      onClick={() => goToPage("/shop")}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left hover:bg-gray-100"
                    >
                      <ShoppingBag size={19} /> Continue Shopping
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={19} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CART */}
            <motion.button
              {...iconHover}
              onClick={() => goToPage("/cart")}
              className="relative flex flex-col items-center"
              aria-label="Open Cart"
            >
              <ShoppingCart size={24} className="sm:h-7 sm:w-7" />
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff6038] px-1 text-[10px] sm:h-5 sm:min-w-5 sm:text-xs"
              >
                {cartCount}
              </motion.span>
              <span className="hidden text-xs sm:block">Cart</span>
            </motion.button>

            {/* MOBILE MENU */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="lg:hidden"
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={menuOpen ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  className="block"
                >
                  {menuOpen ? <X size={25} /> : <Menu size={25} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* DESKTOP SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden h-14 max-w-[800px] flex-1 items-center overflow-hidden rounded-full border-2 border-white bg-[#fff5e8] lg:flex lg:order-none"
          >
            <Search size={25} className="ml-5 shrink-0 text-[#064b46]" />
            <input
              type="text"
              placeholder="Search products, brands and more..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-full min-w-0 flex-1 bg-transparent px-5 text-base text-gray-800 outline-none"
            />
            <button
              type="submit"
              className="h-full bg-orange-500 px-9 font-bold text-white hover:bg-orange-600"
            >
              Search
            </button>
          </form>

          {/* MOBILE SEARCH */}
          <form
            onSubmit={handleSearch}
            className="order-3 flex h-10 w-full items-center overflow-hidden rounded-full bg-[#fff5e8] lg:hidden"
          >
            <Search size={19} className="ml-3 shrink-0 text-[#064b46]" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-800 outline-none"
            />
            <button
              type="submit"
              className="h-full shrink-0 bg-orange-500 px-4 text-xs font-bold text-white sm:px-5 sm:text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* DESKTOP NAVIGATION */}
      <nav className="hidden items-center justify-between gap-4 bg-[#fff4e5] px-8 py-3 lg:flex">
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => goToPage("/categories")}
          className="flex items-center gap-3 rounded-xl bg-[#064b46] px-5 py-3 font-bold text-white"
        >
          <Menu size={23} /> All Categories <ChevronDown size={18} />
        </motion.button>

        {navItems.map((item, index) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <motion.button
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -3, color: "#ff6038" }}
              onClick={() => goToPage(item.path)}
              className={`flex items-center gap-2 px-4 py-3 font-semibold ${
                active ? "text-[#ff6038]" : "text-gray-800"
              }`}
            >
              <Icon size={22} /> {item.name}
            </motion.button>
          );
        })}

        <motion.button
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => goToPage("/join")}
          className="rounded-full bg-[#064b46] px-7 py-3 font-bold text-white hover:bg-[#0b625b]"
        >
          Join ZEVORA ✨
        </motion.button>
      </nav>

      {/* MOBILE NAVIGATION */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-1 overflow-hidden bg-[#fff4e5] p-4 text-[#064b46] lg:hidden"
          >
            {[
              ...navItems,
              { name: "Wishlist", path: "/wishlist", icon: Heart },
              { name: "Cart", path: "/cart", icon: ShoppingCart },
              { name: "Join ZEVORA", path: "/join", icon: UserRound },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => goToPage(item.path)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold hover:bg-[#e9dfcf]"
                >
                  <Icon size={20} /> {item.name}
                </motion.button>
              );
            })}

            {!user && (
              <button
                onClick={() => openAuth("login")}
                className="mt-2 rounded-lg bg-[#064b46] px-4 py-3 text-left font-semibold text-white"
              >
                Login / Sign Up
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGIN / SIGNUP MODAL */}
      <AnimatePresence>
        {authModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAuthModal(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative my-4 max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-3xl bg-[#fffaf2] p-5 shadow-2xl sm:p-8"
            >
              <button
                onClick={() => setAuthModal(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-200"
                aria-label="Close Login"
              >
                <X size={22} />
              </button>

              <div className="mb-6 text-center">
                <h2 className="text-3xl font-extrabold text-[#064b46]">
                  ZEVORA<span className="text-[#ff6038]">.</span>
                </h2>
                <h3 className="mt-4 text-2xl font-bold text-gray-900">
                  {authMode === "login" ? "Welcome Back!" : "Create Account"}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {authMode === "login"
                    ? "Login to continue shopping."
                    : "Join ZE VORA and discover more."}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-gray-800 hover:bg-gray-50 disabled:opacity-60"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="h-5 w-5"
                />
                Continue with Google
              </motion.button>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-300" />
                <span className="text-center text-[10px] font-medium text-gray-400 sm:text-xs">
                  OR CONTINUE WITH EMAIL
                </span>
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              <form onSubmit={handleEmailAuth} className="space-y-4">
                {authMode === "signup" && (
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>
                    <div className="flex items-center rounded-xl border border-gray-300 bg-white px-3">
                      <User size={19} className="text-gray-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full min-w-0 bg-transparent px-3 py-3 outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="flex items-center rounded-xl border border-gray-300 bg-white px-3">
                    <Mail size={19} className="shrink-0 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full min-w-0 bg-transparent px-3 py-3 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="flex items-center rounded-xl border border-gray-300 bg-white px-3">
                    <Lock size={19} className="shrink-0 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full min-w-0 bg-transparent px-3 py-3 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="shrink-0 text-gray-400"
                      aria-label="Toggle Password Visibility"
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                {authMode === "login" && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm font-semibold text-[#064b46] hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {error && (
                  <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </p>
                )}

                {message && (
                  <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    {message}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#064b46] py-3 font-bold text-white hover:bg-[#0b625b] disabled:opacity-60"
                >
                  {loading && <Loader2 size={19} className="animate-spin" />}
                  {authMode === "login" ? "Login" : "Create Account"}
                </motion.button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-600">
                {authMode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={() => {
                    setAuthMode(authMode === "login" ? "signup" : "login");
                    setError("");
                    setMessage("");
                  }}
                  className="ml-1 font-bold text-[#064b46] hover:underline"
                >
                  {authMode === "login" ? "Sign Up" : "Login"}
                </button>
              </p>

              <p className="mt-5 text-center text-xs text-gray-400">
                By continuing, you agree to ZE VORA's Terms and Privacy Policy.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STATUS MESSAGE */}
      <AnimatePresence>
        {message && !authModal && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-5 left-4 right-4 z-[110] mx-auto max-w-sm rounded-xl bg-[#064b46] px-5 py-3 text-center text-sm font-medium text-white shadow-xl sm:left-auto sm:right-5"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
