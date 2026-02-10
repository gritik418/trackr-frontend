"use client";

import { OrgHeader } from "@/components/org/OrgHeader";
import { cn } from "@/lib/utils";
import { useUser } from "@/providers/AuthProvider";
import { ChevronRight, CreditCard, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaChevronLeft } from "react-icons/fa6";

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const router = useRouter();

  const navItems = [
    { label: "Profile", href: "/account", icon: User },
    { label: "Settings", href: "/account/settings", icon: Settings },
    { label: "Billing", href: "/account/billing", icon: CreditCard },
  ];

  const handleBackToDashboard = () => {
    if (user) {
      router.push("/org");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark-0 text-white flex flex-col">
      <OrgHeader />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 bg-bg-dark-1/30 hidden md:flex flex-col p-6">
          <div className="space-y-2 flex flex-col">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                    isActive
                      ? "bg-brand/10 text-brand border border-brand/20 shadow-lg shadow-brand/10"
                      : "text-neutral-500 hover:text-white hover:bg-white/5",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      className={cn(
                        "transition-colors",
                        isActive
                          ? "text-brand"
                          : "text-neutral-500 group-hover:text-white",
                      )}
                    />
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  {isActive && (
                    <ChevronRight size={14} className="text-brand" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto pt-8 flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-linear-to-br from-brand/10 to-transparent border border-white/5">
              <h4 className="text-xs font-bold text-brand uppercase tracking-widest mb-2">
                Pro Plan
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed mb-3">
                Upgrade for more projects and advanced features.
              </p>
              <button className="w-full py-2 bg-brand text-bg-dark-0 text-xs font-bold rounded-lg hover:scale-105 transition-all">
                Upgrade Now
              </button>
            </div>

            <button
              onClick={handleBackToDashboard}
              className="w-full flex items-center justify-center gap-2 py-2 cursor-pointer bg-white/5 text-white text-sm font-bold rounded-lg hover:scale-105 transition-all"
            >
              <FaChevronLeft size={12} /> Back to Dashboard
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-bg-dark-0 relative">
          {/* Background Gradients */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 p-8 max-w-4xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
