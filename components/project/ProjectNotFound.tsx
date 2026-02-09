"use client";

import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Home, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProjectNotFound = () => {
  const params = useParams();
  const slug = params?.slug as string;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full p-6 text-center animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="relative mb-8"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />

        {/* Circle Container */}
        <div className="relative w-24 h-24 bg-red-500/10 border-2 border-red-500/20 rounded-full flex items-center justify-center">
          <ShieldAlert className="w-12 h-12 text-red-500" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Project Not Found
        </h2>
        <p className="text-dashboard-item-text max-w-lg mx-auto mb-8 text-lg leading-relaxed">
          The project you're looking for could not be found. It may have been
          <span className="text-white font-medium">
            {" "}
            deleted by the owner or admin
          </span>
          , or you may{" "}
          <span className="text-brand font-medium">
            no longer have access
          </span>{" "}
          to it.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <Link
          href={`/dashboard/${slug}/projects`}
          className="flex items-center gap-2 px-6 py-3 bg-brand text-black font-semibold rounded-xl hover:bg-brand-hover transition-all duration-300 shadow-lg shadow-brand/20 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
        <Link
          href={`/dashboard/${slug}`}
          className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white font-medium rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 active:scale-95"
        >
          <Home className="w-4 h-4" />
          Go Home
        </Link>
      </motion.div>

      {/* Decorative pulse ring */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[120px] opacity-20" />
      </div>
    </div>
  );
};

export default ProjectNotFound;
