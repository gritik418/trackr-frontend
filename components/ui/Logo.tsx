'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils'
import { APP_CONFIG } from '@/constants/app';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  href?: string;
}

export function Logo({ className, size = 40, showText = true, href = "/" }: LogoProps) {
  return (
    <Link href={href} className={cn("flex items-center gap-3 group transition-all", className)}>
      <div className="relative">
        <div 
          className="absolute inset-0 rounded-xl bg-brand-cyan/20 blur-md group-hover:blur-lg transition-all" 
          style={{ width: size, height: size }}
        />
        <div className="relative rounded-[30%] overflow-hidden shadow-2xl shadow-brand-cyan/20 border border-white/10 group-hover:scale-105 transition-transform duration-300">
          <Image 
            src="/logo.jpeg" 
            alt={APP_CONFIG.NAME} 
            width={size} 
            height={size} 
            className="object-cover"
          />
        </div>
      </div>
      {showText && (
        <span className="text-2xl font-bold tracking-tighter text-white">
          {APP_CONFIG.NAME}
        </span>
      )}
    </Link>
  );
}
