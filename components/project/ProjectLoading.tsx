"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const ProjectLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 animate-fade-in">
      <div className="relative flex items-center justify-center">
        {/* Glowing background effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute w-24 h-24 bg-brand/20 rounded-full blur-2xl"
        />

        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative w-16 h-16 border-2 border-brand/10 border-t-brand rounded-full"
        />

        {/* Inner icon */}
        <div className="absolute flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-brand animate-spin" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-center"
      >
        <h3 className="text-xl font-semibold text-white mb-2">
          Syncing Project Data
        </h3>
        <p className="text-dashboard-item-text max-w-xs mx-auto">
          Preparing your workspace and fetching the latest updates...
        </p>
      </motion.div>

      {/* Decorative skeleton-like bars */}
      <div className="mt-12 w-full max-w-md space-y-4">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="h-12 w-full bg-white/5 rounded-xl border border-white/5 flex items-center px-4 space-x-3 overflow-hidden font-bold"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-2 w-1/3 bg-white/10 rounded" />
              <div className="h-1.5 w-1/2 bg-white/5 rounded" />
            </div>
            <div className="w-12 h-6 rounded-full bg-white/5" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectLoading;
