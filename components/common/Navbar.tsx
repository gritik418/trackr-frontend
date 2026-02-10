"use client";

import { Logo } from "@/components/ui/Logo";
import { useUser } from "@/providers/AuthProvider";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoading, isAuthenticated, user } = useUser();
  const router = useRouter();

  const handleRedirect = () => {
    if (user) {
      router.push("/org");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Product", "Features", "Network", "Pricing"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-bg-dark-0/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo size={40} />

        {/* Desktop Nav */}
        <div
          className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-300 ${
            isScrolled
              ? "bg-white/5 backdrop-blur-md border border-white/10"
              : "bg-transparent"
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative font-semibold px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors group"
            >
              {item}
              {/* Animated underline */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-brand to-purple-500 group-hover:w-full transition-all duration-300 rounded-full" />
            </Link>
          ))}
        </div>

        {!isLoading && !isAuthenticated ? (
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="relative cursor-pointer text-sm font-semibold text-white px-5 py-2.5 rounded-xl hover:bg-white/5 transition-all overflow-hidden group"
            >
              <span className="relative z-10">Log in</span>
              <div className="absolute inset-0 bg-white/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-xl" />
            </Link>

            <Link
              href="/signup"
              className="relative cursor-pointer text-sm font-bold text-bg-dark-0 bg-brand px-6 py-2.5 rounded-xl shadow-lg shadow-brand/20 hover:shadow-brand/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative z-10">Get Started</span>
              <ArrowRight
                size={16}
                className="relative z-10 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        ) : (
          <button
            onClick={handleRedirect}
            className="relative cursor-pointer text-sm font-bold text-bg-dark-0 bg-brand px-6 py-2.5 rounded-xl shadow-lg shadow-brand/20 hover:shadow-brand/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10">Dashboard</span>
          </button>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-bg-dark-1/95 backdrop-blur-xl border-b border-white/10 p-6 animate-in slide-in-from-top-4 duration-300 shadow-xl">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-lg font-medium text-neutral-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent my-2" />
            <Link
              href="/login"
              className="text-center py-3 rounded-xl border border-white/10 font-semibold hover:bg-white/5 transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="relative text-center py-3 rounded-xl bg-brand text-bg-dark-0 font-bold shadow-lg shadow-brand/20 hover:shadow-brand/40 hover:scale-[1.02] active:scale-95 transition-all overflow-hidden group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative z-10">Get Started</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
