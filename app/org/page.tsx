"use client";

import OrgSkeleton from "@/components/org/OrgSkeleton";
import { ProfileMenu } from "@/components/org/ProfileMenu";
import { Logo } from "@/components/ui/Logo";
import { useGetOrganizationsQuery } from "@/features/organization/organization.api";
import { OrgWithRole } from "@/features/organization/organization.interface";
import { ArrowRight, Globe, Plus, Search, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen w-full bg-[#020202] text-white flex flex-col font-sans selection:bg-brand/30 overflow-x-hidden">
      {/* Navbar */}
      <header className="h-[72px] border-b border-white/6 flex items-center px-6 lg:px-12 bg-[#020202]/80 backdrop-blur-xl sticky top-0 z-50">
        <Logo size={38} showText={true} />
        <div className="ml-auto flex items-center gap-6">
          {/* Search Placeholder */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/3 border border-white/6 text-sm text-neutral-500 hover:border-white/10 transition-colors w-64 cursor-text">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ml-2 bg-transparent border-none outline-none"
            />
          </div>

          <div className="h-6 w-px bg-white/10 hidden md:block" />

          <ProfileMenu />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative w-full">
        {/* Subtle Background Glows */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-cyan/5 blur-[150px] rounded-full pointer-events-none opacity-60" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/5 blur-[180px] rounded-full pointer-events-none opacity-40" />

        <div className="w-full max-w-5xl z-10 space-y-12">
          {/* Header Text */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
              Select Organization
            </h1>
            <p className="text-neutral-400 text-lg font-medium max-w-lg mx-auto leading-relaxed">
              Choose a workspace to continue your work or start a new journey.
            </p>
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Org Cards */}
              {filteredOrganizations.map((org: OrgWithRole) => (
                <Link
                  key={org.id}
                  href={
                    org.role === "OWNER" || org.role === "ADMIN"
                      ? `/org/${org.slug}`
                      : `/org/${org.slug}/workspaces`
                  }
                  className="group relative bg-[#0A0A0B] border border-white/8 rounded-2xl p-6 transition-all duration-300 hover:border-brand-cyan/40 hover:shadow-[0_0_40px_-10px_rgba(34,211,238,0.1)] hover:-translate-y-1 overflow-hidden"
                >
                  {/* Card Highlight Effect */}
                  <div className="absolute inset-0 bg-linear-to-br from-brand-cyan/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10 flex justify-between items-start mb-6">
                    {org.logoUrl ? (
                      <Image
                        src={org.logoUrl}
                        alt={org.name}
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                    ) : (
                      <div
                        className={`w-14 h-14 rounded-xl ${org.role === "OWNER" ? "bg-brand" : "bg-brand/30"} flex items-center justify-center text-xl font-bold text-white shadow-lg ring-4 ring-bg-dark-0 ring-offset-2 ring-offset-transparent group-hover:ring-offset-brand-cyan/20 transition-all duration-300`}
                      >
                        {org.name.charAt(0)}
                      </div>
                    )}
                    <div
                      className={`px-3 py-1 rounded-full text-[10px] font-bold text-neutral-400 uppercase tracking-widest group-hover:border-brand-cyan/20 group-hover:text-brand-cyan transition-colors border-2 ${org.role === "OWNER" ? "border-purple-600/50 bg-purple-600/30" : org.role === "ADMIN" ? "border-blue-600/50 bg-blue-600/30" : "border-yellow-600/40 bg-yellow-600/20"}`}
                    >
                      {org.role}
                    </div>
                  </div>

                  <div className="relative z-10 space-y-2 mb-8">
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors line-clamp-1">
                      {org.name}
                    </h3>
                    {org.websiteUrl && (
                      <p className="text-sm text-neutral-500 flex items-center gap-2 group-hover:text-neutral-400 transition-colors">
                        <Globe size={13} strokeWidth={2} /> {org.websiteUrl}
                      </p>
                    )}
                  </div>

                  <div className="relative z-10 pt-6 border-t border-white/6 flex items-center justify-between text-sm group-hover:border-white/10 transition-colors">
                    <div className="flex items-center gap-2 text-neutral-400 group-hover:text-neutral-300 transition-colors">
                      <Users size={14} strokeWidth={2} />
                      <span className="font-medium">
                        {org.members.length} members
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-brand-cyan font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Enter Workspace <ArrowRight size={14} strokeWidth={2.5} />
                    </div>
                  </div>
                </Link>
              ))}

              {/* Create New Card */}
              <Link
                href="/org/create"
                className="group relative border border-dashed border-white/10 bg-transparent hover:bg-white/2 hover:border-brand-cyan/40 rounded-2xl p-6 flex flex-col items-center justify-center gap-5 text-center transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-white/3 border border-white/5 group-hover:border-brand-cyan/20 group-hover:bg-brand-cyan/10 flex items-center justify-center text-neutral-500 group-hover:text-brand-cyan transition-all duration-300 group-hover:scale-110 shadow-inner">
                  <Plus size={28} strokeWidth={2.5} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors">
                    Create Organization
                  </h3>
                  <p className="text-sm text-neutral-500 px-8 leading-snug group-hover:text-neutral-400 transition-colors">
                    Add a new workspace to manage your projects.
                  </p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
