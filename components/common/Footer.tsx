'use client';

import { APP_CONFIG } from '@/constants/app';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '../ui/Logo';

export function Footer() {
  return (
    <footer className="pt-24 pb-12 border-t border-white/5 bg-bg-dark-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Logo size={40} />
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs font-medium">
              The high-velocity task management platform designed for the next generation of builders.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <button key={i} className="text-neutral-500 hover:text-white transition-colors">
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Product</h4>
            <ul className="space-y-4">
              {['Overview', 'Workspaces', 'Task Activity', 'Security'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-neutral-500 hover:text-brand transition-colors text-sm font-medium">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Resources</h4>
            <ul className="space-y-4">
              {['Documentation', 'Knowledge Base', 'API Reference', 'Status'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-neutral-500 hover:text-brand transition-colors text-sm font-medium">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-neutral-500 hover:text-brand transition-colors text-sm font-medium">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-neutral-600 text-xs font-medium uppercase tracking-[0.2em]">
            © {APP_CONFIG.YEAR} {APP_CONFIG.COMPANY.toUpperCase()}. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-neutral-600 hover:text-white text-xs font-medium uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-neutral-600 hover:text-white text-xs font-medium uppercase tracking-widest transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
