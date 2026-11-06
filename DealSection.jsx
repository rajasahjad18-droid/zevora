import React, { useEffect, useState } from "react";
import {
  Clock,
  ShoppingCart,
  ArrowRight,
  Flame,
  Check,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

const deals = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 1499,
    oldPrice: 2999,
    discount: 50,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700",
  },
  {
    id: 2,
    name: "Classic Fashion Sneakers",
    category: "Fashion",
    price: 1199,
    oldPrice: 1999,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
  },
  {
    id: 3,
    name: "Modern Wrist Watch",
    category: "Accessories",
    price: 1799,
    oldPrice: 2999,
    discount: 40,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
  },
  {
    id: 4,
    name: "Premium Travel Backpack",
    category: "Lifestyle",
    price: 999,
    oldPrice: 1599,
    discount: 38,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700",
  },
];

const DealSection = () => {
  const [timeLeft, setTimeLeft] = useState(
    5 * 60 * 60 + 24 * 60 + 30
  );
  const [cart, setCart] = useState([]);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((previous) => Math.max(previous - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const addToCart = (product) => {
    setCart((previous) =>
      previous.includes(product.id)
        ? previous
        : [...previous, product.id]
    );
  };

  // Animation settings
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 45,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: "easeOut",
      },
    },
  };

  const cardAnimation = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 55,
      scale: shouldReduceMotion ? 1 : 0.94,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        delay: shouldReduceMotion ? 0 : index * 0.13,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="overflow-hidden bg-[#fffaf2] px-5 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1500px]">

        {/* HEADING */}
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[3px] text-[#d95b32]"
            >
              <motion.span
                animate={
                  shouldReduceMotion
                    ? {}
                    : { scale: [1, 1.2, 1] }
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <Flame size={19} />
              </motion.span>
              Limited Time Offers
            </motion.div>

            <h2 className="text-3xl font-extrabold text-[#064b46] sm:text-4xl">
              Today's Best Deals
            </h2>

            <p className="mt-3 text-gray-500">
              Grab your favourite products at amazing prices.
            </p>
          </motion.div>

          {/* COUNTDOWN */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            whileHover={
              shouldReduceMotion
                ? {}
                : { y: -5, scale: 1.02 }
            }
            className="rounded-2xl bg-[#064b46] p-5 text-white shadow-lg"
          >
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <Clock size={18} className="text-orange-400" />
              {timeLeft > 0 ? "Deal ends in" : "Deals have ended"}
            </div>

            {timeLeft > 0 ? (
              <div className="flex items-center gap-3">
                {[hours, minutes, seconds].map((time, index) => (
                  <React.Fragment key={index}>
                    <div className="min-w-[58px] rounded-xl bg-white/10 px-3 py-2 text-center">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={time}
                          initial={
                            shouldReduceMotion
                              ? false
                              : { opacity: 0, y: -8 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          exit={
                            shouldReduceMotion
                              ? {}
                              : { opacity: 0, y: 8 }
                          }
                          transition={{ duration: 0.2 }}
                          className="text-2xl font-extrabold tabular-nums"
                        >
                          {time}
                        </motion.p>
                      </AnimatePresence>

                      <p className="text-[10px] uppercase text-white/60">
                        {["Hours", "Minutes", "Seconds"][index]}
                      </p>
                    </div>

                    {index !== 2 && (
                      <span className="text-xl font-bold">:</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <p className="font-bold text-orange-300">
                Come back for new deals!
              </p>
            )}
          </motion.div>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((product, index) => {
            const added = cart.includes(product.id);

            return (
              <motion.div
                key={product.id}
                custom={index}
                variants={cardAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.2,
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -10,
                        transition: { duration: 0.3 },
                      }
                }
                className="group overflow-hidden rounded-2xl border border-[#064b46]/10 bg-white shadow-sm hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    whileHover={
                      shouldReduceMotion
                        ? {}
                        : { scale: 1.12 }
                    }
                    transition={{ duration: 0.6 }}
                  />

                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{
                      delay: 0.2 + index * 0.1,
                      duration: 0.4,
                    }}
                    className="absolute left-4 top-4 rounded-full bg-[#d95b32] px-3 py-2 text-xs font-extrabold text-white"
                  >
                    {product.discount}% OFF
                  </motion.span>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#d95b32]">
                    {product.category}
                  </p>

                  <h3 className="mt-2 min-h-12 font-bold text-[#064b46]">
                    {product.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xl font-extrabold text-[#064b46]">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.oldPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <motion.button
                    disabled={timeLeft === 0}
                    onClick={() => addToCart(product)}
                    whileHover={
                      shouldReduceMotion || timeLeft === 0
                        ? {}
                        : { scale: 1.03 }
                    }
                    whileTap={
                      shouldReduceMotion || timeLeft === 0
                        ? {}
                        : { scale: 0.96 }
                    }
                    className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold transition ${
                      timeLeft === 0
                        ? "cursor-not-allowed bg-gray-300 text-gray-500"
                        : added
                          ? "bg-green-700 text-white"
                          : "bg-[#064b46] text-white hover:bg-[#d95b32]"
                    }`}
                  >
                    {added ? <Check size={18} /> : <ShoppingCart size={18} />}

                    {timeLeft === 0
                      ? "Deal Ended"
                      : added
                        ? "Added to Cart"
                        : "Add to Cart"}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* VIEW ALL */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          className="mt-10 text-center"
        >
          <motion.a
            href="#shop"
            whileHover={
              shouldReduceMotion
                ? {}
                : { scale: 1.06, backgroundColor: "#064b46" }
            }
            whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-full bg-[#d95b32] px-8 py-4 font-bold text-white transition"
          >
            View All Products
            <motion.span
              animate={
                shouldReduceMotion
                  ? {}
                  : { x: [0, 5, 0] }
              }
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
            >
              <ArrowRight size={19} />
            </motion.span>
          </motion.a>
        </motion.div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Demo countdown and sample product offers.
        </p>

      </div>
    </section>
  );
};

export default DealSection;