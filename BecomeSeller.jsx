
import React, { useState } from "react";
import {
  Store,
  TrendingUp,
  Users,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

const BecomeSeller = () => {
  const reduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    store: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      store: "",
    });
  };

  const benefits = [
    {
      icon: Users,
      title: "Reach More Customers",
      text: "Showcase your products to more shoppers.",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      text: "Build your brand and expand your sales.",
    },
    {
      icon: ShieldCheck,
      title: "Easy Management",
      text: "Manage your store and products in one place.",
    },
  ];

  const reveal = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 45,
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
        staggerChildren: reduceMotion ? 0 : 0.15,
      },
    },
  };

  return (
    <section className="overflow-hidden bg-[#fffaf2] px-5 py-20 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1500px]">

        {/* MAIN BANNER */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid overflow-hidden rounded-[30px] bg-[#064b46] lg:grid-cols-2"
        >

          {/* LEFT CONTENT */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="flex flex-col justify-center p-8 text-white sm:p-12 lg:p-16"
          >

            <motion.div
              variants={reveal}
              className="mb-6 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm"
            >
              <Store size={17} className="text-orange-400" />
              <span>ZE VORA PARTNER PROGRAM</span>
            </motion.div>

            <motion.h2
              variants={reveal}
              className="text-4xl font-extrabold leading-tight sm:text-5xl"
            >
              Turn Your Products
              <span className="block text-orange-400">
                Into Success.
              </span>
            </motion.h2>

            <motion.p
              variants={reveal}
              className="mt-6 max-w-lg leading-7 text-white/70"
            >
              Have a business or online store?
              Join ZE VORA and introduce your products
              to customers through our marketplace.
            </motion.p>

            {/* BENEFITS */}
            <motion.div
              variants={stagger}
              className="mt-10 space-y-6"
            >
              {benefits.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    variants={reveal}
                    whileHover={
                      reduceMotion
                        ? {}
                        : { x: 8 }
                    }
                    className="flex gap-4"
                  >
                    <motion.div
                      whileHover={
                        reduceMotion
                          ? {}
                          : { rotate: 8, scale: 1.1 }
                      }
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-400 text-[#064b46]"
                    >
                      <Icon size={23} />
                    </motion.div>

                    <div>
                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-white/60">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="group relative min-h-[350px] overflow-hidden lg:min-h-full"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200"
              alt="Online seller managing products"
              className="absolute inset-0 h-full w-full object-cover"
              whileHover={
                reduceMotion
                  ? {}
                  : { scale: 1.08 }
              }
              transition={{ duration: 0.7 }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#064b46]/80 via-transparent to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/20 bg-white/15 p-5 text-white backdrop-blur-md"
            >
              <p className="text-sm text-white/70">
                Your Business, Your Opportunity
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Start Your Selling Journey
              </h3>
            </motion.div>
          </motion.div>

        </motion.div>

        {/* REGISTRATION FORM */}
        <motion.div
          id="seller-form"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="mx-auto mt-16 max-w-3xl rounded-3xl border border-[#064b46]/10 bg-white p-6 shadow-xl sm:p-10"
        >

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="mb-8 text-center"
          >
            <motion.p
              variants={reveal}
              className="text-sm font-bold uppercase tracking-[3px] text-[#d95b32]"
            >
              Seller Registration
            </motion.p>

            <motion.h2
              variants={reveal}
              className="mt-3 text-3xl font-extrabold text-[#064b46]"
            >
              Start Selling With Us
            </motion.h2>

            <motion.p
              variants={reveal}
              className="mt-3 text-gray-500"
            >
              Fill in your details to get started.
            </motion.p>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl bg-green-50 p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  <CheckCircle2
                    size={48}
                    className="mx-auto text-green-600"
                  />
                </motion.div>

                <h3 className="mt-4 text-xl font-bold text-green-800">
                  Form Submitted!
                </h3>

                <p className="mt-2 text-sm text-green-700">
                  This is a demo submission. Your details have not
                  been sent to a server.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSubmitted(false)}
                  className="mt-5 font-bold text-[#064b46] underline"
                >
                  Submit Another Response
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {[
                  {
                    label: "Full Name",
                    name: "name",
                    type: "text",
                    placeholder: "Enter your full name",
                  },
                  {
                    label: "Email Address",
                    name: "email",
                    type: "email",
                    placeholder: "Enter your email",
                  },
                  {
                    label: "Phone Number",
                    name: "phone",
                    type: "tel",
                    placeholder: "Enter your phone number",
                  },
                  {
                    label: "Store Name",
                    name: "store",
                    type: "text",
                    placeholder: "Enter your business name",
                  },
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.08,
                    }}
                  >
                    <label className="mb-2 block text-sm font-semibold text-[#064b46]">
                      {field.label}
                    </label>

                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition duration-300 focus:border-[#d95b32] focus:ring-2 focus:ring-[#d95b32]/10"
                    />
                  </motion.div>
                ))}

                <motion.button
                  type="submit"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "#064b46",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d95b32] py-4 font-bold text-white transition"
                >
                  Submit Application
                  <ArrowRight size={19} />
                </motion.button>

              </motion.form>
            )}
          </AnimatePresence>

        </motion.div>

      </div>
    </section>
  );
};

export default BecomeSeller;
