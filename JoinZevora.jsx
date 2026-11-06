
import React, { useState } from "react";
import {
  Mail,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

const JoinZevora = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const reduceMotion = useReducedMotion();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

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

  return (
    <section className="bg-[#fffaf2] px-5 py-16 md:px-10 lg:px-16">
      <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[30px] bg-[#064b46] px-6 py-16 text-center text-white sm:px-12">

        {/* ANIMATED DECORATIVE CIRCLES */}
        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, -25, 0],
                  y: [0, 20, 0],
                  rotate: [0, 12, 0],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[35px] border-white/5"
        />

        <motion.div
          animate={
            reduceMotion
              ? {}
              : {
                  x: [0, 25, 0],
                  y: [0, -20, 0],
                  rotate: [0, -12, 0],
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full border-[40px] border-orange-400/10"
        />

        <div className="relative z-10 mx-auto max-w-2xl">

          {/* ANIMATED ICON */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.7 }}
            whileHover={
              reduceMotion
                ? {}
                : {
                    scale: 1.12,
                    rotate: 8,
                  }
            }
            transition={{ duration: 0.3 }}
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-400 text-[#064b46]"
          >
            <motion.div
              animate={
                reduceMotion
                  ? {}
                  : {
                      rotate: [0, 15, -15, 0],
                    }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={28} />
            </motion.div>
          </motion.div>

          {/* SUBTITLE */}
          <motion.p
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.7 }}
            className="text-sm font-bold uppercase tracking-[4px] text-orange-400"
          >
            Stay Connected
          </motion.p>

          {/* HEADING */}
          <motion.h2
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.7 }}
            className="mt-4 text-3xl font-extrabold sm:text-5xl"
          >
            Join the ZE VORA
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="block text-orange-400"
            >
              Family!
            </motion.span>
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.7 }}
            className="mx-auto mt-5 max-w-xl leading-7 text-white/70"
          >
            Be the first to discover new arrivals, exclusive
            offers and exciting updates from ZE VORA.
          </motion.p>

          {/* SUBSCRIPTION FORM */}
          <AnimatePresence mode="wait">
            {subscribed ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="mx-auto mt-9 flex max-w-md items-center justify-center gap-2 rounded-xl bg-white/10 p-5 text-green-300"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle2 size={22} />
                </motion.div>

                <span className="font-semibold">
                  Thanks for joining ZE VORA!
                </span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.7 }}
                onSubmit={handleSubmit}
                className="mx-auto mt-9 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-3 sm:flex-row"
              >
                <div className="flex flex-1 items-center gap-3 px-3">
                  <Mail
                    size={21}
                    className="shrink-0 text-[#064b46]"
                  />

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full min-w-0 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={
                    reduceMotion
                      ? {}
                      : {
                          scale: 1.04,
                          backgroundColor: "#064b46",
                        }
                  }
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#d95b32] px-7 py-4 font-bold text-white"
                >
                  Subscribe

                  <motion.span
                    animate={reduceMotion ? {} : { x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* FOOTNOTE */}
          <motion.p
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.7 }}
            className="mt-5 text-xs text-white/40"
          >
            Stay updated with ZE VORA. Unsubscribe anytime.
          </motion.p>

        </div>
      </div>
    </section>
  );
};

export default JoinZevora;
