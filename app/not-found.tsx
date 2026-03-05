"use client";

import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Rocket } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="min-h-screen bg-bg-dark-0 text-white pt-40 selection:bg-brand/30 flex flex-col">
        <Navbar />

        <main className="flex-1 relative flex items-center justify-center px-4">
          {/* Immersive Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand/10 blur-[180px] rounded-full animate-pulse" />
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/5 blur-[140px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/5 blur-[140px] rounded-full" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
          </div>

          <div className="relative z-10 max-w-4xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 relative inline-block"
            >
              {/* 404 Shadow/Glow */}
              <div className="absolute inset-0 blur-3xl bg-brand/20 scale-110 rounded-full" />

              <h1 className="text-[12rem] md:text-[18rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-white/80 to-white/20 select-none">
                404
              </h1>

              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 md:-right-12 p-4 md:p-6 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl"
              >
                <Rocket className="text-brand w-8 h-8 md:w-12 md:h-12" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Lost in the <span className="text-brand">void?</span>
              </h2>
              <p className="text-lg md:text-xl text-neutral-500 font-light max-w-xl mx-auto leading-relaxed">
                This page seems to have drifted away into the deep reaches of
                space. Let's get you back to familiar coordinates.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <Link
                  href="/"
                  className="group px-8 py-4 bg-brand text-bg-dark-0 font-black rounded-2xl hover:bg-brand-hover hover:shadow-2xl hover:shadow-brand/30 transition-all active:scale-[0.98] flex items-center gap-3 w-full sm:w-auto justify-center"
                >
                  <Home size={20} />
                  Back to Home
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="px-8 py-4 cursor-pointer bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all active:scale-[0.98] flex items-center gap-3 w-full sm:w-auto justify-center group"
                >
                  <ArrowLeft
                    size={20}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  Go Back
                </button>
              </div>
            </motion.div>

            {/* Background constellation/dotted pattern */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
              <div className="grid grid-cols-12 gap-4 w-full h-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-white/1 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
