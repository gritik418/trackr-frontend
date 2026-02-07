"use client";

import OrganizationItem from "@/components/org/OrganizationItem";
import OrgSkeleton from "@/components/org/OrgSkeleton";
import { ProfileMenu } from "@/components/org/ProfileMenu";
import { Logo } from "@/components/ui/Logo";
import { useGetOrganizationsQuery } from "@/features/organization/organization.api";
import { OrgWithRole } from "@/features/organization/organization.interface";
import { Globe, Plus, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="text-center space-y-6 py-12 px-6 bg-[#0A0A0B] border border-white/8 rounded-3xl max-w-lg mx-auto">
    <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
      <Globe className="text-red-500" size={32} />
    </div>
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-white">Something went wrong</h2>
      <p className="text-neutral-400">
        We couldn't load your organizations. Please check your connection or try
        again later.
      </p>
    </div>
    <button
      onClick={onRetry}
      className="px-8 cursor-pointer py-3 bg-brand/10 hover:bg-brand/20 text-brand font-bold rounded-xl transition-all border border-brand/20 active:scale-95"
    >
      Try Again
    </button>
  </div>
);

export default function OrgSelectionPage() {
  const { data, isLoading, error } = useGetOrganizationsQuery();
  const [organizations, setOrganizations] = useState<OrgWithRole[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredOrganizations = useMemo(() => {
    if (!searchQuery.trim()) return organizations;

    return organizations.filter(
      (org) =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.websiteUrl.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [organizations, searchQuery]);

  useEffect(() => {
    if (data?.organizations) {
      setOrganizations(data.organizations);
    }
  }, [data]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen w-full bg-[#020202] text-white flex flex-col font-sans selection:bg-brand/30 overflow-x-hidden">
      {/* Navbar - Minimalist */}
      <header className="h-[72px] border-b border-white/6 flex items-center px-6 lg:px-12 bg-[#020202]/40 backdrop-blur-xl sticky top-0 z-50">
        <Logo size={34} showText={true} />
        <div className="ml-auto flex items-center gap-6">
          <ProfileMenu />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-24 px-6 relative w-full">
        {/* Complex Atmospheric Background Mesh - Repositioned & Z-indexed */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand/10 blur-[150px] rounded-full opacity-40 animate-pulse duration-[10s]" />
          <div className="absolute top-[20%] right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full opacity-30 animate-pulse duration-[15s]" />
          <div className="absolute bottom-[-10%] left-1/3 w-[900px] h-[700px] bg-purple-600/5 blur-[180px] rounded-full opacity-20" />
        </div>

        <div className="w-full max-w-5xl z-10 space-y-20">
          {/* Header Section with Integrated Search */}
          <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="text-center space-y-6">
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
                Choose{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/40">
                  Space
                </span>
              </h1>
              <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed tracking-wide opacity-80">
                Select an organization to access your projects or start fresh
                with a new team.
              </p>
            </div>

            {/* Centered Search Bar - Accessible on all screens */}
            {organizations.length > 0 && (
              <div className="max-w-xl mx-auto w-full group relative px-4">
                <div className="absolute -inset-1 bg-linear-to-r from-brand/20 via-blue-500/10 to-purple-500/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl ring-1 ring-inset ring-white/5 group-focus-within:border-brand/40 group-focus-within:ring-brand/20 transition-all duration-300">
                  <Search
                    size={20}
                    className="text-neutral-500 group-focus-within:text-brand transition-colors"
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search your organizations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none flex-1 text-lg text-white placeholder:text-neutral-600"
                  />
                  <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                    ⌘ K
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Grid or States */}
          {error ? (
            <ErrorState onRetry={handleRetry} />
          ) : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <OrgSkeleton key={i} />
              ))}
            </div>
          ) : organizations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-6 rounded-3xl bg-white/3 backdrop-blur-xl border border-white/10 ring-1 ring-inset ring-white/5 animate-in zoom-in duration-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-brand/5 to-transparent opacity-50 pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center mb-6">
                  <Globe size={40} className="text-brand" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No Organizations Found
                </h3>
                <p className="text-neutral-400 text-center max-w-md mb-8">
                  It looks like you aren't part of any organizations yet. Create
                  your first organization to get started.
                </p>
                <Link
                  href="/org/create"
                  className="flex cursor-pointer items-center gap-2 px-8 py-3 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20 transition-all active:scale-95 group"
                >
                  <Plus
                    size={20}
                    className="group-hover:rotate-90 transition-transform duration-300"
                  />
                  Create Organization
                </Link>
              </div>
            </div>
          ) : filteredOrganizations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 px-6 rounded-3xl bg-white/3 backdrop-blur-xl border border-white/10 ring-1 ring-inset ring-white/5 animate-in zoom-in duration-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-b from-blue-500/5 to-transparent opacity-50 pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Search size={40} className="text-neutral-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No Matching Organizations
                </h3>
                <p className="text-neutral-400 text-center max-w-md mb-8">
                  No organizations found matching "
                  <span className="text-white font-medium">{searchQuery}</span>
                  ". Try a different search term or clear the filter.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all active:scale-95 cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Org Cards */}
              {filteredOrganizations.map((org: OrgWithRole, index: number) => (
                <div
                  key={org.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <OrganizationItem org={org} />
                </div>
              ))}

              {/* Create New Card */}
              <div
                className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both h-full"
                style={{
                  animationDelay: `${filteredOrganizations.length * 100}ms`,
                }}
              >
                <Link
                  href="/org/create"
                  className="group h-full relative bg-white/3 backdrop-blur-xl border border-white/10 ring-1 ring-inset ring-white/5 rounded-2xl p-8 transition-all duration-500 hover:border-brand/40 hover:shadow-[0_0_50px_-12px_rgba(var(--brand-rgb),0.2)] hover:-translate-y-1.5 hover:scale-[1.02] overflow-hidden flex flex-col items-center justify-center text-center gap-6"
                >
                  {/* Inner Dashed Ring for Context */}
                  <div className="absolute inset-2 border border-dashed border-white/5 rounded-xl pointer-events-none group-hover:border-brand/20 transition-colors duration-500" />

                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 group-hover:border-brand/20 group-hover:bg-brand/10 flex items-center justify-center text-neutral-500 group-hover:text-brand transition-all duration-500 group-hover:scale-110 shadow-2xl relative z-10">
                    <Plus size={36} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-3 relative z-10">
                    <h3 className="text-2xl font-black text-white group-hover:text-brand transition-colors tracking-tight">
                      New Space
                    </h3>
                    <p className="text-sm text-neutral-400 px-4 leading-relaxed font-light group-hover:text-neutral-300 transition-colors">
                      Expand your horizons by creating a new organization.
                    </p>
                  </div>

                  {/* Dynamic Hover Glow */}
                  <div className="absolute inset-0 bg-linear-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
