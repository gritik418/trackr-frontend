'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-bg-dark-0/80 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Logo size={40} />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Product', 'Features', 'Network', 'Pricing'].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-sm font-semibold text-white px-5 py-2.5 rounded-xl hover:bg-white/5 transition-all"
          >
            Log in
          </Link>
          <Link 
            href="/signup" 
            className="text-sm font-bold text-bg-dark-0 bg-brand-cyan px-6 py-2.5 rounded-xl shadow-[0_0_20px_var(--color-brand-cyan)]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-neutral-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-bg-dark-1 border-b border-white/5 p-6 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4">
            {['Product', 'Features', 'Network', 'Pricing'].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-lg font-medium text-neutral-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="h-px bg-white/5 my-2" />
            <Link 
              href="/login" 
              className="text-center py-3 rounded-xl border border-white/10 font-semibold"
            >
              Log in
            </Link>
            <Link 
              href="/signup" 
              className="text-center py-3 rounded-xl bg-brand-cyan text-bg-dark-0 font-bold"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
