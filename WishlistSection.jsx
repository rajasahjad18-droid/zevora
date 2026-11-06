
import React from "react";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

const WishlistSection = ({
  wishlist = [],
  products = [],
  cart = [],
  onRemove,
  onAddToCart,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  // REUSABLE ANIMATION

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardAnimation = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 45,
      scale: shouldReduceMotion ? 1 : 0.95,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : (index % 8) * 0.08,
      },
    }),
    exit: {
      opacity: 0,
      scale: 0.85,
      y: -20,
      transition: { duration: 0.25 },
    },
  };

  return (
    <section
      id="wishlist"
      className="min-h-screen overflow-hidden bg-[#fffaf2] px-5 py-16 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1500px]">

        {/* HEADING */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="mb-10 flex flex-wrap items-center justify-between gap-4"
        >
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[3px] text-[#d95b32]">
              Your Favourite Collection
            </p>

            <h2 className="text-3xl font-extrabold text-[#064b46] sm:text-4xl">
              My Wishlist
            </h2>

            <p className="mt-3 text-gray-500">
              All your favourite products in one place.
            </p>
          </div>

          <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.06, y: -3 }}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-[#064b46] shadow-sm"
          >
            <motion.span
              animate={
                shouldReduceMotion ? {} : { scale: [1, 1.2, 1] }
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart size={19} className="text-[#d95b32]" />
            </motion.span>

            {wishlistProducts.length} Saved Items
          </motion.div>
        </motion.div>

        {/* EMPTY WISHLIST / PRODUCTS */}

        <AnimatePresence mode="wait">
          {wishlistProducts.length === 0 ? (
            <motion.div
              key="empty-wishlist"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl border border-[#064b46]/10 bg-white px-5 py-16 text-center"
            >
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : { scale: [1, 1.12, 1] }
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart
                  size={55}
                  className="mx-auto text-[#d95b32]/50"
                />
              </motion.div>

              <h3 className="mt-5 text-2xl font-bold text-[#064b46]">
                Your Wishlist is Empty
              </h3>

              <p className="mt-3 text-gray-500">
                Save products you love by clicking the heart icon.
              </p>

              <motion.a
                href="/shop"
                whileHover={shouldReduceMotion ? {} : { scale: 1.06 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#064b46] px-6 py-3 font-bold text-white transition hover:bg-[#d95b32]"
              >
                Explore Products
                <ArrowRight size={18} />
              </motion.a>
            </motion.div>
          ) : (
            <motion.div
              key="wishlist-products"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {wishlistProducts.map((product, index) => {
                  const isAdded = cart.includes(product.id);

                  return (
                    <motion.div
                      key={product.id}
                      custom={index}
                      variants={cardAnimation}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{
                        once: false,
                        amount: 0.15,
                      }}
                      exit="exit"
                      layout
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : { y: -8 }
                      }
                      className="overflow-hidden rounded-2xl border border-[#064b46]/10 bg-white shadow-sm hover:shadow-xl"
                    >
                      {/* IMAGE */}

                      <div className="relative h-64 overflow-hidden bg-[#f3eee5]">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                          whileHover={
                            shouldReduceMotion ? {} : { scale: 1.1 }
                          }
                          transition={{ duration: 0.55 }}
                        />

                        {/* REMOVE BUTTON */}

                        <motion.button
                          onClick={() => onRemove?.(product.id)}
                          aria-label="Remove from wishlist"
                          whileHover={
                            shouldReduceMotion
                              ? {}
                              : { scale: 1.12, rotate: -8 }
                          }
                          whileTap={
                            shouldReduceMotion ? {} : { scale: 0.85 }
                          }
                          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-md transition hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>

                      {/* CONTENT */}

                      <div className="p-5">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#d95b32]">
                          {product.category}
                        </p>

                        <h3 className="mt-2 font-bold text-[#064b46]">
                          {product.name}
                        </h3>

                        {/* PRICE */}

                        <div className="mt-3 flex items-center gap-3">
                          <span className="text-xl font-extrabold text-[#064b46]">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>

                          <span className="text-sm text-gray-400 line-through">
                            ₹{product.originalPrice.toLocaleString("en-IN")}
                          </span>
                        </div>

                        {/* ADD TO CART */}

                        <motion.button
                          onClick={() => onAddToCart?.(product.id)}
                          whileHover={
                            shouldReduceMotion ? {} : { scale: 1.04 }
                          }
                          whileTap={
                            shouldReduceMotion ? {} : { scale: 0.96 }
                          }
                          className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold text-white transition ${
                            isAdded
                              ? "bg-green-600"
                              : "bg-[#064b46] hover:bg-[#d95b32]"
                          }`}
                        >
                          <ShoppingCart size={18} />

                          {isAdded ? "Added to Cart" : "Add to Cart"}
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default WishlistSection;
