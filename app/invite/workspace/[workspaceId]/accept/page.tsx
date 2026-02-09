"use client";

import { Logo } from "@/components/ui/Logo";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Clock,
  Fingerprint,
  Globe,
  Layers,
  LayoutDashboard,
  Shield,
  Sparkles,
  User,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  usePreviewWorkspaceInviteQuery,
  useAcceptWorkspaceInviteMutation,
  useDeclineWorkspaceInviteMutation,
} from "@/features/workspace/workspace.api";
import { WorkspaceInviteStatus } from "@/features/workspace/workspace.interface";
import toast from "react-hot-toast";
import Image from "next/image";

export default function WorkspaceAcceptInvitePage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.workspaceId as string;
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const {
    data: previewData,
    isLoading,
    error,
  } = usePreviewWorkspaceInviteQuery(
    { workspaceId, token },
    { skip: !token || !workspaceId },
  );

  const [acceptWorkspaceInvite] = useAcceptWorkspaceInviteMutation();
  const [declineWorkspaceInvite] = useDeclineWorkspaceInviteMutation();

  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  const invite = previewData?.invite;

  const handleAccept = async () => {
    try {
      setIsAccepting(true);
      const res = await acceptWorkspaceInvite({
        workspaceId,
        body: { token },
      }).unwrap();

      if (res.success) {
        toast.success(res.message);
        router.push(`/dashboard/${workspace?.slug}`);
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to accept invitation");
    } finally {
      setIsAccepting(false);
    }
  };

  const handleDecline = async () => {
    try {
      setIsDeclining(true);
      const res = await declineWorkspaceInvite({
        workspaceId,
        body: { token },
      }).unwrap();

      if (res.success) {
        toast.success(res.message);
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to decline invitation");
    } finally {
      setIsDeclining(false);
    }
  };

  const workspace = invite?.workspace;

  const formattedExpiryDate = new Date(
    invite?.expiresAt || "",
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#020202] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Logo size={48} />
          <div className="h-8 w-8 border-4 border-brand/30 border-t-brand rounded-full animate-spin" />
          <p className="text-neutral-500 font-bold text-xs uppercase tracking-widest animate-pulse">
            Authenticating Invitation...
          </p>
        </div>
      </div>
    );
  }

  if (error || !invite || invite.status === WorkspaceInviteStatus.EXPIRED) {
    const isExpired = invite?.status === WorkspaceInviteStatus.EXPIRED;

    return (
      <div className="min-h-screen w-full bg-[#020202] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-[32px] p-12 text-center space-y-6 backdrop-blur-3xl">
          <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400">
            <X size={40} />
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            {isExpired ? "Invitation Expired" : "Invalid Invitation"}
          </h2>
          <p className="text-neutral-400 font-light leading-relaxed">
            {isExpired
              ? "This invitation link has expired. Please contact your workspace administrator to receive a new invite."
              : "This invitation link is invalid or has already been used. Please contact your workspace administrator."}
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-brand font-bold text-xs uppercase tracking-widest hover:underline"
          >
            Return to Login <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const workspaceFeatures = [
    {
      title: "Isolated Environment",
      description:
        "Dedicated resources and configuration for this specific workspace.",
      icon: Layers,
      color: "text-purple-400",
    },
    {
      title: "Project Management",
      description: "Full access to Kanban boards, sprints, and epic tracking.",
      icon: LayoutDashboard,
      color: "text-indigo-400",
    },
    {
      title: "High-Performance API",
      description: "Optimized 50ms latency for all real-time interactions.",
      icon: Zap,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#020202] text-white flex flex-col p-6 lg:p-12 relative overflow-x-hidden font-sans selection:bg-brand/30">
      {/* Dynamic Background Aurora */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[1200px] h-[800px] bg-brand/10 blur-[180px] rounded-full opacity-40 animate-pulse duration-[12s]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[1100px] h-[900px] bg-blue-600/5 blur-[220px] rounded-full opacity-20 animate-pulse duration-[15s] delay-700" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      </div>

      {/* Navbar */}
      <nav className="flex items-center justify-between h-20 mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
        <Logo size={32} showText={true} />
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#"
            className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
          >
            Documentation
          </Link>
          <Link
            href="#"
            className="text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
          >
            Security
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
            <Fingerprint size={16} />
            Workspace Invite
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start pb-20">
        {/* LEFT COLUMN: INFORMATION & CONTEXT */}
        <div className="lg:col-span-7 space-y-16 py-12">
          {/* Welcome Section */}
          <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-1000 fill-mode-both">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">
              <Sparkles size={12} className="text-brand" />
              Collaborate in Workspace
            </div>

            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[1.05] text-transparent bg-clip-text bg-linear-to-b from-white to-white/60">
              Welcome to <br />
              <span className="text-brand">{workspace?.name}</span>
            </h1>

            <p className="text-neutral-400 text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
              You&apos;ve been invited to join the{" "}
              <span className="text-white font-bold">{workspace?.name}</span>{" "}
              workspace within{" "}
              <span className="text-white font-bold">
                {workspace?.organization.name}
              </span>
              . Get ready to ship with precision and speed.
            </p>
          </div>

          {/* About the Workspace Segment */}
          <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200 fill-mode-both">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-[32px] bg-white/3 border border-white/5 backdrop-blur-3xl relative group hover:bg-white/5 transition-all duration-500">
              <div className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight size={16} className="text-neutral-400" />
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Layers size={24} />
                </div>
                <h3 className="text-xl font-black tracking-tight text-white">
                  {workspace?.name}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  {workspace?.description || "No description provided"}
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                    Organization
                  </p>
                  <div className="text-sm text-white font-semibold flex items-center gap-2">
                    {workspace?.organization.logoUrl ? (
                      <Image
                        src={workspace?.organization.logoUrl}
                        alt=""
                        width={40}
                        height={40}
                        className="rounded-sm h-10 w-10 object-cover"
                      />
                    ) : (
                      <Building2 size={40} className="text-brand" />
                    )}
                    <div className="flex flex-col">
                      <p>{workspace?.organization.name}</p>

                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Globe size={12} />{" "}
                        {workspace?.organization?.websiteUrl}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                    Workspace Owner
                  </p>
                  <div className="text-sm text-white font-semibold flex items-center gap-2">
                    {workspace?.owner?.avatarUrl ? (
                      <Image
                        src={workspace?.owner.avatarUrl}
                        alt=""
                        width={30}
                        height={30}
                        className="rounded-sm h-8 w-8 object-cover"
                      />
                    ) : (
                      <User size={30} className="text-brand" />
                    )}
                    <div className="flex flex-col">
                      <p>{workspace?.owner.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Workspace Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 fill-mode-both">
            {workspaceFeatures.map((f, i) => (
              <div key={i} className="space-y-4 group">
                <div
                  className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center ${f.color} border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-xl group-hover:shadow-${f.color.split("-")[1]}/20`}
                >
                  <f.icon size={20} />
                </div>
                <h4 className="text-sm font-black tracking-tight text-white group-hover:text-brand transition-colors">
                  {f.title}
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: THE INVITE CARD */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 animate-in fade-in zoom-in duration-1000 fill-mode-both">
          <div className="relative group">
            {/* Animated Accent Glow */}
            <div className="absolute -inset-1.5 bg-linear-to-r from-brand/40 via-indigo-500/20 to-purple-500/30 blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-700 rounded-[40px]" />

            <div className="relative bg-black/40 backdrop-blur-3xl border border-white/10 ring-1 ring-inset ring-white/10 rounded-[36px] p-8 lg:p-10 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Inviter Info Header */}
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/5">
                <div className="w-14 h-14 rounded-full border border-white/10 bg-neutral-900 flex items-center justify-center overflow-hidden shrink-0">
                  <div className="w-full h-full bg-linear-to-br from-brand/30 to-indigo-600/30 flex items-center justify-center text-xl font-black text-brand">
                    {invite.invitedBy.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-neutral-500 font-black uppercase tracking-[0.2em] mb-0.5">
                    Invited by
                  </p>
                  <p className="text-lg font-bold text-white tracking-tight">
                    {invite.invitedBy.name}
                  </p>
                </div>
                <div className="px-3 py-1 capitalize rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-neutral-400">
                  {invite.status.toLowerCase()}
                </div>
              </div>

              <div className="flex flex-col items-center text-center space-y-8">
                {/* Workspace Visual */}
                <div className="relative mb-2">
                  {workspace?.iconUrl ? (
                    <Image
                      src={workspace.iconUrl}
                      alt=""
                      width={96}
                      height={96}
                      className="rounded-2xl h-24 w-24 object-cover bg-linear-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center relative z-10 shadow-2xl overflow-hidden group/icon transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center relative z-10 shadow-2xl overflow-hidden group/icon transition-all duration-500 group-hover:scale-105">
                      <Layers size={48} className="text-brand relative z-10" />
                    </div>
                  )}
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#00E599]/10 border border-[#00E599]/30 flex items-center justify-center backdrop-blur-lg animate-pulse z-20">
                    <Check size={20} className="text-[#00E599]" />
                  </div>
                </div>

                {/* Invite Content */}
                <div className="space-y-3 px-4">
                  <h2 className="text-2xl font-black tracking-tighter text-white">
                    Join Workspace
                  </h2>
                  <p className="text-neutral-400 text-sm leading-relaxed font-light">
                    Accept the invitation to start working within{" "}
                    <span className="text-white font-bold">
                      {workspace?.name}
                    </span>
                    .
                  </p>
                </div>

                {/* Organization Badge */}
                <div className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400">
                      <Building2 size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-tight">
                        Parent Organization
                      </p>
                      <p className="text-sm font-bold text-white tracking-tight">
                        {workspace?.organization.name}
                      </p>
                    </div>
                  </div>
                  <Shield size={20} className="text-neutral-500 opacity-50" />
                </div>

                {/* Action Buttons */}
                <div className="w-full space-y-4 pt-4">
                  <button
                    onClick={handleAccept}
                    disabled={isAccepting || isDeclining}
                    className="group/btn relative w-full h-16 cursor-pointer flex items-center justify-center gap-3 bg-brand text-bg-dark-0 font-black text-base rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_20px_40px_-10px_rgba(var(--brand-rgb),0.3)] disabled:opacity-50 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_2s_infinite]" />
                    {isAccepting ? (
                      <div className="h-6 w-6 border-3 border-bg-dark-0/30 border-t-bg-dark-0 rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Confirm and Join
                        <ArrowRight
                          size={20}
                          strokeWidth={3}
                          className="group-hover/btn:translate-x-1 transition-all duration-300"
                        />
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDecline}
                    disabled={isAccepting || isDeclining}
                    className="w-full h-14 cursor-pointer flex items-center justify-center gap-3 bg-transparent text-neutral-500 font-bold text-sm rounded-2xl border border-white/5 transition-all duration-300 hover:bg-white/5 hover:text-red-400 hover:border-red-400/20 disabled:opacity-50"
                  >
                    {isDeclining ? (
                      <div className="h-5 w-5 border-2 border-neutral-500/30 border-t-neutral-500 rounded-full animate-spin"></div>
                    ) : (
                      "Decline Invitation"
                    )}
                  </button>
                </div>
              </div>

              {/* Expiry Footer */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-500 font-bold text-[9px] uppercase tracking-widest">
                  <Clock size={14} className="text-brand/50" />
                  Expires: {formattedExpiryDate}
                </div>
                <Link
                  href="#"
                  className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest hover:text-brand transition-colors decoration-dashed underline underline-offset-4 decoration-white/20"
                >
                  Security Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <footer className="mt-auto py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 animate-in fade-in duration-1000 delay-500">
        <div className="flex items-center gap-4">
          <Logo size={24} />
          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em]">
            © 2024 Trackr Technologies Inc.
          </p>
        </div>
        <div className="flex items-center gap-8 text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
          <Link href="#" className="hover:text-brand transition-colors">
            {workspace?.organization.name} Cloud
          </Link>
          <Link href="#" className="hover:text-brand transition-colors">
            Privacy Infrastructure
          </Link>
          <Link href="#" className="hover:text-brand transition-colors">
            Status: Operational
          </Link>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
