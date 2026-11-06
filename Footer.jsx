
import React, { useState } from "react";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Headphones,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const reduceMotion = useReducedMotion();

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    alert("Thank you for subscribing to ZE VORA!");
    setEmail("");
  };

  const shoppingLinks = [
    { name: "All Products", path: "/shop" },
    { name: "Fashion", path: "/shop" },
    { name: "Electronics", path: "/shop" },
    { name: "Home & Kitchen", path: "/shop" },
    { name: "Beauty", path: "/shop" },
    { name: "Sports", path: "/shop" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Deals", path: "/deals" },
    { name: "Wishlist", path: "/wishlist" },
    { name: "My Cart", path: "/cart" },
    { name: "Become a Seller", path: "/seller" },
    { name: "Join ZE VORA", path: "/join" },
  ];

  const socialLinks = [
    { name: "Instagram", url: "https://instagram.com" },
    { name: "Facebook", url: "https://facebook.com" },
    { name: "X", url: "https://x.com" },
    { name: "YouTube", url: "https://youtube.com" },
  ];

  const features = [
    {
      icon: Truck,
      title: "Easy Shopping",
      desc: "Explore our collections",
    },
    {
      icon: ShieldCheck,
      title: "Secure Shopping",
      desc: "Shop with confidence",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      desc: "We're here to help",
    },
    {
      icon: CreditCard,
      title: "Easy Payments",
      desc: "Convenient checkout",
    },
  ];

  const reveal = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 35,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
        ease: "easeOut",
      },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };

  const linkAnimation = {
    hidden: {
      opacity: 0,
      x: reduceMotion ? 0 : -15,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="overflow-hidden bg-[#064b46] text-white">

      {/* NEWSLETTER */}

      <div className="border-b border-white/10 px-5 py-14 md:px-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-8 md:flex-row"
        >
          <motion.div variants={reveal}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[4px] text-[#ffb18f]">
              STAY CONNECTED
            </p>

            <h2 className="text-3xl font-bold md:text-4xl">
              Get the latest offers.
            </h2>

            <p className="mt-3 text-sm text-white/65">
              Subscribe to receive exclusive deals and updates.
            </p>
          </motion.div>

          <motion.form
            variants={reveal}
            onSubmit={handleSubscribe}
            whileHover={
              reduceMotion ? {} : { y: -3 }
            }
            className="flex w-full max-w-lg overflow-hidden rounded-xl bg-white p-1.5"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="min-w-0 flex-1 px-4 py-3 text-sm text-[#064b46] outline-none"
            />

            <motion.button
              type="submit"
              whileHover={
                reduceMotion
                  ? {}
                  : { backgroundColor: "#064b46" }
              }
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 rounded-lg bg-[#d95b32] px-5 py-3 text-sm font-bold text-white transition"
            >
              Subscribe

              <motion.span
                animate={reduceMotion ? {} : { x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <ArrowRight size={17} />
              </motion.span>
            </motion.button>
          </motion.form>
        </motion.div>
      </div>

      {/* MAIN FOOTER */}

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-10"
      >

        {/* BRAND */}

        <motion.div variants={reveal}>
          <Link to="/" className="inline-block">
            <motion.h2
              whileHover={
                reduceMotion ? {} : { scale: 1.05 }
              }
              className="text-4xl font-black tracking-[3px]"
            >
              ZE<span className="text-[#ff9a73]">VORA</span>
            </motion.h2>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">
            Discover quality products, amazing collections and
            a better shopping experience with ZE VORA.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {socialLinks.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                }}
                whileHover={
                  reduceMotion
                    ? {}
                    : { y: -5, scale: 1.05 }
                }
                whileTap={{ scale: 0.95 }}
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold transition hover:border-[#ff9a73] hover:bg-[#d95b32]"
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* SHOP */}

        <motion.div variants={reveal}>
          <h3 className="mb-6 text-lg font-bold">
            Shop Categories
          </h3>

          <motion.ul
            variants={stagger}
            className="space-y-4"
          >
            {shoppingLinks.map((item) => (
              <motion.li
                key={item.name}
                variants={linkAnimation}
              >
                <Link
                  to={item.path}
                  className="inline-block text-sm text-white/65 transition hover:translate-x-1 hover:text-[#ffb18f]"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* QUICK LINKS */}

        <motion.div variants={reveal}>
          <h3 className="mb-6 text-lg font-bold">
            Quick Links
          </h3>

          <motion.ul
            variants={stagger}
            className="space-y-4"
          >
            {quickLinks.map((item) => (
              <motion.li
                key={item.name}
                variants={linkAnimation}
              >
                <Link
                  to={item.path}
                  className="inline-block text-sm text-white/65 transition hover:translate-x-1 hover:text-[#ffb18f]"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* CONTACT */}

        <motion.div variants={reveal}>
          <h3 className="mb-6 text-lg font-bold">
            Get In Touch
          </h3>

          <div className="space-y-5">

            {[
              {
                icon: MapPin,
                text: "India",
              },
              {
                icon: Mail,
                text: "support@zevora.com",
              },
              {
                icon: Phone,
                text: "Customer Support",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.text}
                  whileHover={
                    reduceMotion ? {} : { x: 5 }
                  }
                  className="flex items-start gap-3"
                >
                  <Icon
                    size={19}
                    className="mt-1 shrink-0 text-[#ffb18f]"
                  />

                  <p className="break-all text-sm leading-6 text-white/65">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}

          </div>
        </motion.div>

      </motion.div>

      {/* SERVICE FEATURES */}

      <div className="border-y border-white/10 px-5 py-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="mx-auto grid max-w-[1200px] grid-cols-2 gap-7 md:grid-cols-4"
        >
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                variants={reveal}
                whileHover={
                  reduceMotion
                    ? {}
                    : { y: -6 }
                }
                className="flex items-center gap-3"
              >
                <motion.div
                  whileHover={
                    reduceMotion
                      ? {}
                      : { rotate: 12, scale: 1.15 }
                  }
                >
                  <Icon
                    size={27}
                    className="shrink-0 text-[#ffb18f]"
                  />
                </motion.div>

                <div>
                  <h4 className="text-sm font-bold">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-xs text-white/50">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* BOTTOM */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7 }}
        className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-5 py-7 text-center md:flex-row md:px-10"
      >
        <p className="text-xs text-white/55">
          © {new Date().getFullYear()} ZE VORA. All rights reserved.
        </p>

        <motion.p
          animate={
            reduceMotion ? {} : { opacity: [0.65, 1, 0.65] }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="text-sm font-semibold tracking-wider text-[#ffb18f]"
        >
          SHOP SMART. LIVE BETTER.
        </motion.p>

        <p className="text-xs text-white/55">
          Made with care in India.
        </p>
      </motion.div>

    </footer>
  );
};

export default Footer;
