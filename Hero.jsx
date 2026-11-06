
import React from "react";
import {
  ArrowRight,
  Play,
  Truck,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  Shirt,
  Smartphone,
  House,
  Sparkles,
  ShoppingBasket,
  Dumbbell,
} from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";
import heroImage from "../assets/hero.png";

const categories = [
  {
    name: "Fashion",
    subtitle: "Style for everyone",
    icon: Shirt,
    color: "bg-[#fce5d9]",
  },
  {
    name: "Electronics",
    subtitle: "Latest gadgets",
    icon: Smartphone,
    color: "bg-[#dcebea]",
  },
  {
    name: "Home & Kitchen",
    subtitle: "Make life better",
    icon: House,
    color: "bg-[#f5e8d1]",
  },
  {
    name: "Beauty",
    subtitle: "Beauty essentials",
    icon: Sparkles,
    color: "bg-[#f5dfe8]",
  },
  {
    name: "Grocery",
    subtitle: "Daily essentials",
    icon: ShoppingBasket,
    color: "bg-[#e2eddc]",
  },
  {
    name: "Sports",
    subtitle: "Move with energy",
    icon: Dumbbell,
    color: "bg-[#e5e2f5]",
  },
];

const HeroSection = ({ onCategorySelect }) => {
  const shouldReduceMotion = useReducedMotion();

  const handleCategoryClick = (category) => {
    onCategorySelect?.(category);

    document.getElementById("shop")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleShopNow = () => {
    onCategorySelect?.("All Products");

    document.getElementById("shop")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 25,
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

  const sectionAnimation = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative isolate min-h-[620px] w-full overflow-hidden bg-[#fff4e5] sm:min-h-[650px] lg:min-h-0">

        {/* HERO IMAGE */}
        <motion.img
          src={heroImage}
          alt="ZE VORA Shopping"
          initial={{
            scale: shouldReduceMotion ? 1 : 1.04,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 1,
            ease: "easeOut",
          }}
          className="absolute inset-0 h-full w-full object-contain object-center -translate-y-50 sm:translate-y-0 sm:object-cover sm:object-[center_35%]"/>

        {/* IMAGE OVERLAY */}
        <div className="absolute inset-0 bg-white/20 sm:bg-white/30 lg:bg-transparent" />

        {/* HERO CONTENT */}
        <div className="relative z-10 flex min-h-[620px] items-center py-12 sm:min-h-[650px] sm:py-16 lg:min-h-[620px] lg:py-20">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-12 lg:px-16">

            <motion.div
              variants={sectionAnimation}
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              {/* BADGE */}
              <motion.div
                variants={fadeUp}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#bce5c8] px-3 py-2 text-xs font-bold text-[#064b46] sm:mb-5 sm:px-4 sm:text-sm"
              >
                <CheckCircle2 size={16} />
                Your One-Stop Marketplace
              </motion.div>

              {/* HEADING */}
              <motion.h1
                variants={fadeUp}
                className="max-w-2xl break-words text-4xl font-extrabold leading-[1.12] text-[#064b46] sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Discover.
                <span className="text-[#ff6038]"> Shop.</span>
                <span> Enjoy.</span>
              </motion.h1>

              {/* DESCRIPTION */}
              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-lg text-sm font-semibold leading-6 text-gray-700 sm:mt-5 sm:text-base sm:leading-7 md:text-lg"
              >
                Explore amazing products from trusted sellers
                at the best prices.
              </motion.p>

              {/* BUTTONS */}
              <motion.div
                variants={fadeUp}
                className="mt-6 flex flex-col items-stretch gap-3 sm:mt-7 sm:flex-row sm:items-center sm:gap-5"
              >
                {/* SHOP NOW */}
                <motion.button
                  onClick={handleShopNow}
                  whileHover={{
                    scale: 1.04,
                    boxShadow:
                      "0px 10px 25px rgba(255, 96, 56, 0.25)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#ff6038] px-7 py-3.5 font-bold text-white transition hover:bg-[#e94d2b] sm:w-auto sm:px-8 sm:py-4"
                >
                  Shop Now

                  <motion.span
                    animate={
                      shouldReduceMotion ? {} : { x: [0, 5, 0] }
                    }
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                    }}
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                </motion.button>

                {/* WATCH VIDEO */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-center gap-3 font-bold text-[#064b46] sm:justify-start"
                  type="button"
                >
                  <motion.span
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#064b46] sm:h-12 sm:w-12"
                  >
                    <Play size={18} fill="currentColor" />
                  </motion.span>

                  Watch Video
                </motion.button>
              </motion.div>

              {/* FEATURES */}
              <motion.div
                variants={sectionAnimation}
                className="mt-8 grid grid-cols-2 gap-x-3 gap-y-5 sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-6"
              >
                <motion.div
                  variants={fadeUp}
                  whileHover={{
                    y: shouldReduceMotion ? 0 : -4,
                  }}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <Truck
                    size={25}
                    className="shrink-0 text-[#064b46] sm:h-[30px] sm:w-[30px]"
                  />
                  <div>
                    <p className="text-xs font-bold text-gray-700 sm:text-sm">
                      Free Shipping
                    </p>
                    <p className="text-[11px] text-gray-600 sm:text-sm">
                      Above ₹999
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  whileHover={{
                    y: shouldReduceMotion ? 0 : -4,
                  }}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  <ShieldCheck
                    size={25}
                    className="shrink-0 text-[#064b46] sm:h-[30px] sm:w-[30px]"
                  />
                  <div>
                    <p className="text-xs font-bold text-gray-700 sm:text-sm">
                      Secure Payments
                    </p>
                    <p className="text-[11px] text-gray-600 sm:text-sm">
                      100% Safe
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  whileHover={{
                    y: shouldReduceMotion ? 0 : -4,
                  }}
                  className="col-span-2 flex items-center justify-center gap-2 sm:col-span-1 sm:justify-start sm:gap-3"
                >
                  <Headphones
                    size={25}
                    className="shrink-0 text-[#064b46] sm:h-[30px] sm:w-[30px]"
                  />
                  <div>
                    <p className="text-xs font-bold text-gray-700 sm:text-sm">
                      24/7 Support
                    </p>
                    <p className="text-[11px] text-gray-600 sm:text-sm">
                      Always Here
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="w-full bg-[#fffaf2] px-3 py-10 sm:px-6 sm:py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1500px]">

          {/* SECTION HEADING */}
          <motion.div
            variants={sectionAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-10"
          >
            <div>
              <motion.p
                variants={fadeUp}
                className="mb-2 text-[10px] font-bold uppercase tracking-[2px] text-[#ff6038] sm:text-sm sm:tracking-[3px]"
              >
                Explore Collections
              </motion.p>

              <motion.h2
                variants={fadeUp}
                className="text-xl font-extrabold text-[#064b46] sm:text-3xl md:text-4xl"
              >
                Shop by Category
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-2 text-xs text-gray-500 sm:mt-3 sm:text-base"
              >
                Find everything you need, all in one place.
              </motion.p>
            </div>
          </motion.div>

          {/* CATEGORY CARDS */}
          <motion.div
            variants={sectionAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="grid grid-cols-4 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
          >
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <motion.button
                  key={category.name}
                  variants={fadeUp}
                  onClick={() =>
                    handleCategoryClick(category.name)
                  }
                  whileHover={{
                    y: shouldReduceMotion ? 0 : -5,
                    scale: shouldReduceMotion ? 1 : 1.03,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group min-w-0 rounded-lg border border-[#eee5d9] bg-white p-2 text-center shadow-sm transition-shadow duration-300 hover:shadow-lg sm:rounded-2xl sm:p-5"
                >
                  {/* CATEGORY ICON */}
                  <motion.div
                    whileHover={{
                      scale: shouldReduceMotion ? 1 : 1.1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 12,
                    }}
                    className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full sm:h-20 sm:w-20 md:h-24 md:w-24 ${category.color}`}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.7}
                      className="text-[#064b46] sm:h-9 sm:w-9"
                    />
                  </motion.div>

                  {/* CATEGORY NAME */}
                  <h3 className="mt-2 break-words text-[10px] font-bold leading-tight text-[#064b46] sm:mt-5 sm:text-base">
                    {category.name}
                  </h3>

                  {/* SUBTITLE */}
                  <p className="mt-1 hidden text-xs text-gray-500 sm:block">
                    {category.subtitle}
                  </p>

                  {/* EXPLORE */}
                  <div className="mt-2 hidden items-center justify-center gap-1 text-sm font-semibold text-[#ff6038] sm:flex">
                    Explore
                    <ArrowRight size={14} />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
