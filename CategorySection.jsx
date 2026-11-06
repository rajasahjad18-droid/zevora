
import React from "react";
import {
  ArrowRight,
  Shirt,
  Smartphone,
  House,
  Sparkles,
  ShoppingBasket,
  Dumbbell,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

const categories = [
  {
    name: "Fashion",
    subtitle: "Style for everyone",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800",
    icon: Shirt,
    color: "bg-[#fce5d9]",
  },
  {
    name: "Electronics",
    subtitle: "Latest gadgets",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800",
    icon: Smartphone,
    color: "bg-[#dcebea]",
  },
  {
    name: "Home & Kitchen",
    subtitle: "Make life better",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
    icon: House,
    color: "bg-[#f5e8d1]",
  },
  {
    name: "Beauty",
    subtitle: "Beauty essentials",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
    icon: Sparkles,
    color: "bg-[#f5dfe8]",
  },
  {
    name: "Grocery",
    subtitle: "Daily essentials",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800",
    icon: ShoppingBasket,
    color: "bg-[#e2eddc]",
  },
  {
    name: "Sports",
    subtitle: "Move with energy",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
    icon: Dumbbell,
    color: "bg-[#e5e2f5]",
  },
];

const CategorySection = ({ onCategorySelect }) => {
  const reduceMotion = useReducedMotion();

  const handleCategoryClick = (category) => {
    onCategorySelect(category);

    document.getElementById("shop")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const headingAnimation = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : -40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
        ease: "easeOut",
      },
    },
  };

  const containerAnimation = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };

  const cardAnimation = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 45,
      scale: reduceMotion ? 1 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reduceMotion ? 0 : 0.55,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="overflow-hidden bg-[#fffaf2] px-5 py-16 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1500px]">

        {/* HEADING */}

        <motion.div
          variants={headingAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          className="mb-10 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[3px] text-[#d95b32]">
              Explore Collections
            </p>

            <h2 className="text-3xl font-extrabold text-[#064b46] sm:text-4xl">
              Shop by Category
            </h2>

            <p className="mt-3 text-gray-500">
              Find everything you need, all in one place.
            </p>
          </div>
        </motion.div>

        {/* CATEGORY GRID */}

        <motion.div
          variants={containerAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.12 }}
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6"
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <motion.button
                key={category.name}
                variants={cardAnimation}
                onClick={() => handleCategoryClick(category.name)}
                whileHover={
                  reduceMotion
                    ? {}
                    : {
                        y: -9,
                        scale: 1.02,
                      }
                }
                whileTap={{ scale: 0.97 }}
                className="group overflow-hidden rounded-2xl border border-[#064b46]/10 bg-white text-left shadow-sm transition-shadow duration-300 hover:shadow-xl"
              >
                {/* IMAGE */}

                <div className="relative h-36 overflow-hidden sm:h-44">
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    whileHover={
                      reduceMotion
                        ? {}
                        : { scale: 1.12 }
                    }
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* ICON */}

                  <motion.div
                    whileHover={
                      reduceMotion
                        ? {}
                        : {
                            scale: 1.15,
                            rotate: 10,
                          }
                    }
                    transition={{ duration: 0.3 }}
                    className={`absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full ${category.color}`}
                  >
                    <Icon
                      size={21}
                      className="text-[#064b46]"
                    />
                  </motion.div>
                </div>

                {/* CONTENT */}

                <div className="p-4">
                  <h3 className="font-bold text-[#064b46]">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {category.subtitle}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-sm font-bold text-[#d95b32]">
                    Explore

                    <motion.span
                      animate={
                        reduceMotion
                          ? {}
                          : { x: [0, 4, 0] }
                      }
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight size={15} />
                    </motion.span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default CategorySection;
