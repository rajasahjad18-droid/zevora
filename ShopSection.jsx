
import React, { useMemo } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  ArrowRight,
  SlidersHorizontal,
  Check,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

// 102 PRODUCTS - 17 PRODUCTS PER CATEGORY

const catalog = {
  Fashion: [
    "Classic White Sneakers", "Premium Casual T-Shirt",
    "Stylish Wrist Watch", "Denim Jacket", "Cotton Hoodie",
    "Slim Fit Jeans", "Casual Shirt", "Leather Wallet",
    "Travel Backpack", "Sports Cap", "Running Shoes",
    "Sunglasses", "Formal Shoes", "Women's Handbag",
    "Printed Kurti", "Cotton Dress", "Premium Belt",
  ],
  Electronics: [
    "Wireless Headphones", "Smart Watch", "Digital Camera",
    "Bluetooth Speaker", "Wireless Mouse", "Mechanical Keyboard",
    "Power Bank", "USB-C Charger", "Gaming Headset",
    "Smart LED Bulb", "Tablet Device", "Portable SSD",
    "Webcam HD", "Phone Stand", "Wireless Earbuds",
    "Laptop Backpack", "Mini Projector",
  ],
  "Home & Kitchen": [
    "Modern Table Lamp", "Minimal Home Chair",
    "Ceramic Coffee Mug", "Decorative Vase", "Cotton Bedsheet",
    "Kitchen Organizer", "Non-Stick Cookware", "Water Bottle",
    "Wall Clock", "Storage Basket", "Dinner Plate Set",
    "Floor Cushion", "LED Desk Lamp", "Wooden Tray",
    "Electric Kettle", "Soft Pillow", "Table Organizer",
  ],
  Beauty: [
    "Skincare Essentials", "Beauty Care Products",
    "Face Moisturizer", "Vitamin C Serum", "Face Wash",
    "Body Lotion", "Hair Shampoo", "Hair Conditioner",
    "Makeup Brush Set", "Lip Care Balm", "Sunscreen Lotion",
    "Face Mask Pack", "Beauty Organizer", "Nail Care Kit",
    "Perfume Collection", "Hair Styling Kit", "Gentle Cleanser",
  ],
  Grocery: [
    "Fresh Grocery Basket", "Organic Rice", "Premium Almonds",
    "Fresh Apples", "Organic Honey", "Green Tea Pack",
    "Whole Wheat Flour", "Mixed Dry Fruits", "Breakfast Oats",
    "Fresh Oranges", "Peanut Butter", "Cooking Oil",
    "Organic Lentils", "Premium Coffee", "Healthy Muesli",
    "Cashew Nuts", "Fresh Vegetables",
  ],
  Sports: [
    "Sports Training Shoes", "Football", "Basketball",
    "Cricket Bat", "Yoga Mat", "Gym Gloves",
    "Skipping Rope", "Sports Water Bottle", "Badminton Racket",
    "Tennis Ball Set", "Fitness Resistance Bands",
    "Sports Duffle Bag", "Cycling Helmet", "Training Jersey",
    "Exercise Mat", "Running Shorts", "Fitness Dumbbells",
  ],
};

// PRODUCT IMAGES

const imagePools = {
  Fashion: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700",
  ],
  Electronics: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700",
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=700",
  ],
  "Home & Kitchen": [
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700",
    "https://images.unsplash.com/photo-1503602642458-232111445657?w=700",
    "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=700",
    "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=700",
  ],
  Beauty: [
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700",
    "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=700",
    "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=700",
  ],
  Grocery: [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=700",
    "https://images.unsplash.com/photo-1543168256-418811576931?w=700",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=700",
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700",
  ],
  Sports: [
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=700",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=700",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700",
    "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=700",
  ],
};

// GENERATE PRODUCTS

export const products = Object.entries(catalog).flatMap(
  ([category, names]) =>
    names.map((name, index) => {
      const price = 399 + ((index * 347) % 8500);

      return {
        id: `${category}-${index}`,
        name,
        category,
        price,
        originalPrice: Math.round(price * 1.4),
        rating: Number((4.2 + (index % 8) * 0.1).toFixed(1)),
        reviews: 35 + index * 13,
        image: imagePools[category][index % imagePools[category].length],
      };
    })
);

// SHOP SECTION

const ShopSection = ({
  selectedCategory = "All Products",
  wishlist = [],
  cart = [],
  onToggleWishlist,
  onAddToCart,
  searchQuery = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  // CATEGORY + GLOBAL SEARCH FILTER

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== "All Products") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();

      result = result.filter((product) =>
        `${product.name} ${product.category}`
          .toLowerCase()
          .includes(query)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  const getDiscount = (price, originalPrice) =>
    Math.round(((originalPrice - price) / originalPrice) * 100);

  // REUSABLE ANIMATIONS

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: "easeOut",
      },
    },
  };

  const cardAnimation = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 45,
      scale: shouldReduceMotion ? 1 : 0.96,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : (index % 8) * 0.07,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      id="shop"
      className="overflow-hidden bg-[#fffaf2] px-4 py-16 md:px-8 lg:px-12"
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
            <p className="mb-3 text-sm font-bold uppercase tracking-[4px] text-[#d95b32]">
              ZE VORA COLLECTION
            </p>

            <AnimatePresence mode="wait">
              <motion.h2
                key={`${selectedCategory}-${searchQuery}`}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 15 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  shouldReduceMotion
                    ? {}
                    : { opacity: 0, y: -10 }
                }
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold text-[#064b46] md:text-5xl"
              >
                {searchQuery
                  ? `Search Results: ${searchQuery}`
                  : selectedCategory === "All Products"
                    ? "Featured Products"
                    : selectedCategory}
              </motion.h2>
            </AnimatePresence>

            <p className="mt-3 text-sm text-gray-500 md:text-base">
              Discover amazing products at great prices.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-[#064b46]/10 bg-white px-4 py-3 text-sm font-semibold text-[#064b46]">
              <SlidersHorizontal size={17} />
              {filteredProducts.length} Products
            </div>

            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
              className="flex items-center gap-2 rounded-full bg-[#064b46] px-4 py-3 text-sm font-semibold text-white"
            >
              <ShoppingCart size={17} />
              {cart.length}
            </motion.div>
          </div>
        </motion.div>

        {/* PRODUCT GRID */}

        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              const isWishlisted = wishlist.includes(product.id);
              const isAdded = cart.includes(product.id);

              return (
                <motion.div
                  key={product.id}
                  layout
                  custom={index}
                  variants={cardAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: false,
                    amount: 0.15,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: -9,
                          transition: { duration: 0.25 },
                        }
                  }
                  className="group overflow-hidden rounded-2xl border border-[#064b46]/10 bg-white shadow-sm hover:shadow-xl"
                >
                  {/* IMAGE */}

                  <div className="relative overflow-hidden bg-[#f3eee5]">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-64 w-full object-cover"
                      whileHover={
                        shouldReduceMotion ? {} : { scale: 1.1 }
                      }
                      transition={{ duration: 0.55 }}
                    />

                    <motion.span
                      initial={{ opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.4 }}
                      className="absolute left-3 top-3 rounded-md bg-[#d95b32] px-3 py-1.5 text-xs font-bold text-white"
                    >
                      {getDiscount(product.price, product.originalPrice)}% OFF
                    </motion.span>

                    {/* WISHLIST */}

                    <motion.button
                      onClick={() => onToggleWishlist?.(product.id)}
                      aria-label="Toggle wishlist"
                      whileHover={
                        shouldReduceMotion ? {} : { scale: 1.15 }
                      }
                      whileTap={
                        shouldReduceMotion ? {} : { scale: 0.8 }
                      }
                      className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition ${
                        isWishlisted
                          ? "text-red-500"
                          : "text-[#064b46] hover:text-red-500"
                      }`}
                    >
                      <motion.span
                        animate={
                          isWishlisted && !shouldReduceMotion
                            ? { scale: [1, 1.3, 1] }
                            : { scale: 1 }
                        }
                        transition={{ duration: 0.3 }}
                      >
                        <Heart
                          size={19}
                          fill={isWishlisted ? "currentColor" : "none"}
                        />
                      </motion.span>
                    </motion.button>
                  </div>

                  {/* CONTENT */}

                  <div className="p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#d95b32]">
                      {product.category}
                    </p>

                    <h4 className="truncate text-lg font-bold text-[#064b46]">
                      {product.name}
                    </h4>

                    {/* RATING */}

                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center gap-0.5 text-[#e9a329]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            fill={
                              star <= Math.round(product.rating)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        ))}
                      </div>

                      <span className="text-xs text-gray-500">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* PRICE */}

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="text-xl font-bold text-[#064b46]">
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
                        shouldReduceMotion ? {} : { scale: 1.03 }
                      }
                      whileTap={
                        shouldReduceMotion ? {} : { scale: 0.96 }
                      }
                      className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition ${
                        isAdded
                          ? "bg-green-600 text-white"
                          : "bg-[#064b46] text-white hover:bg-[#d95b32]"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={isAdded ? "added" : "add"}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-2"
                        >
                          {isAdded ? (
                            <>
                              <Check size={18} />
                              Added to Cart
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={18} />
                              Add to Cart
                            </>
                          )}
                        </motion.span>
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* EMPTY SEARCH RESULT */}

        {filteredProducts.length === 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="py-20 text-center"
          >
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#064b46]/10">
              <SlidersHorizontal size={32} className="text-[#064b46]" />
            </div>

            <h3 className="text-2xl font-bold text-[#064b46]">
              No Products Found
            </h3>

            <p className="mt-3 text-gray-500">
              Sorry, we couldn't find "{searchQuery || selectedCategory}".
            </p>

            <p className="mt-1 text-sm text-gray-400">
              Try another product name or category.
            </p>
          </motion.div>
        )}

        {/* CART COUNT */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <div className="flex items-center gap-3 rounded-full bg-[#064b46] px-6 py-3 text-white">
            <ShoppingCart size={19} />

            <span className="text-sm font-semibold">
              Cart Items: {cart.length}
            </span>

            <motion.span
              animate={
                shouldReduceMotion ? {} : { x: [0, 5, 0] }
              }
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <ArrowRight size={17} />
            </motion.span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ShopSection;
