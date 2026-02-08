"use client";

import { useGetOrganizationMembersQuery } from "@/features/organization/organization.api";
import { useSendWorkspaceInviteMutation } from "@/features/workspace/workspace.api";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import { OrganizationMember } from "@/types/organization/organization.interface";
import { WorkspaceRole } from "@/types/workspace/workspace.interface";
import { Check, ChevronDown, Edit3, Eye, Mail, Shield, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import OrgMemberTile from "./OrgMemberTile";

interface InviteWorkspaceMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InviteWorkspaceMemberModal({
  isOpen,
  onClose,
}: InviteWorkspaceMemberModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<WorkspaceRole>(WorkspaceRole.MEMBER);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);
  const workspace = useSelector(selectWorkspace);
  const [orgMembers, setOrgMembers] = useState<OrganizationMember[]>([]);
  const { data } = useGetOrganizationMembersQuery(
    workspace?.organizationId || "",
    {
      skip: !workspace?.organizationId,
    },
  );
  const [sendInvite, { isLoading: isSending }] =
    useSendWorkspaceInviteMutation();

  const modalRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const memberDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data?.members) {
      setOrgMembers(data.members);
    }
  }, [data]);

  console.log(orgMembers);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsRoleDropdownOpen(false);
      }
      if (
        memberDropdownRef.current &&
        !memberDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMemberDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredMembers = orgMembers.filter(
    (member) =>
      member.user.email.toLowerCase().includes(email.toLowerCase()) ||
      member.user.name.toLowerCase().includes(email.toLowerCase()),
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspace?.id) return;

    try {
      await sendInvite({
        workspaceId: workspace.id,
        body: { email, role },
      }).unwrap();

      toast.success("Invitation sent successfully!");
      setEmail("");
      setRole(WorkspaceRole.MEMBER);
      onClose();
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to send invitation");
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-dashboard-card-bg border border-dashboard-border rounded-3xl shadow-2xl shadow-black/50 animate-in zoom-in-95 fade-in duration-300 transform"
      >
        {/* Abstract Background - Different color scheme for Workspace */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand/5 blur-[60px] rounded-full" />
        </div>

        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Invite to Workspace
              </h2>
              <p className="text-neutral-500 text-sm mt-1">
                Add collaborators to this specific workspace.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 cursor-pointer rounded-xl text-neutral-500 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 relative" ref={memberDropdownRef}>
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-brand transition-colors pointer-events-none">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!isMemberDropdownOpen) setIsMemberDropdownOpen(true);
                  }}
                  onFocus={() => {
                    if (filteredMembers.length > 0)
                      setIsMemberDropdownOpen(true);
                  }}
                  placeholder="colleague@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-dashboard-item-bg border border-dashboard-border rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand/50 focus:bg-dashboard-card-bg transition-all"
                />
              </div>

              {isMemberDropdownOpen && filteredMembers.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 max-h-60 overflow-y-auto p-1.5 bg-dashboard-sidebar-bg border border-dashboard-border rounded-xl shadow-xl shadow-black/50 z-30 animate-in fade-in zoom-in-95 duration-200 custom-scrollbar">
                  <div className="px-3 py-2 text-[10px] font-bold text-neutral-500 uppercase tracking-widest border-b border-white/5 mb-1">
                    Organization Members
                  </div>
                  {filteredMembers.map((member) => (
                    <OrgMemberTile
                      member={member}
                      setEmail={setEmail}
                      setIsMemberDropdownOpen={setIsMemberDropdownOpen}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2 relative" ref={dropdownRef}>
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">
                Workspace Role
              </label>
              <button
                type="button"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3.5 bg-dashboard-item-bg border border-dashboard-border rounded-xl text-white hover:bg-dashboard-card-bg transition-all outline-none focus:border-brand/50 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300">
                    {role === WorkspaceRole.ADMIN && <Shield size={16} />}
                    {role === WorkspaceRole.MEMBER && <Edit3 size={16} />}
                    {role === WorkspaceRole.OWNER && <Eye size={16} />}
                  </div>
                  <div>
                    <span className="block font-medium text-sm">{role}</span>
                    <span className="block text-xs text-neutral-500">
                      {role === WorkspaceRole.ADMIN
                        ? "Can manage workspace settings & members."
                        : role === WorkspaceRole.MEMBER
                          ? "Can join and work on projects."
                          : "Can join and manage workspace."}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-neutral-500 transition-transform ${isRoleDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isRoleDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 p-1.5 bg-dashboard-sidebar-bg border border-dashboard-border rounded-xl shadow-xl shadow-black/50 z-20 animate-in fade-in zoom-in-95 duration-200">
                  <button
                    type="button"
                    onClick={() => {
                      setRole(WorkspaceRole.MEMBER);
                      setIsRoleDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Eye size={16} />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-white">
                          Member
                        </div>
                        <div className="text-xs text-neutral-500">
                          Read-only access.
                        </div>
                      </div>
                    </div>
                    {role === WorkspaceRole.MEMBER && (
                      <Check size={16} className="text-emerald-400" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRole(WorkspaceRole.ADMIN);
                      setIsRoleDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                        <Edit3 size={16} />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-white">
                          Admin
                        </div>
                        <div className="text-xs text-neutral-500">
                          Full access to manage workspace.
                        </div>
                      </div>
                    </div>
                    {role === WorkspaceRole.ADMIN && (
                      <Check size={16} className="text-blue-400" />
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSending || !email}
                className="w-full cursor-pointer py-3.5 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand/90 hover:shadow-lg hover:shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-bg-dark-0/30 border-t-bg-dark-0 animate-spin" />
                    Sending Invite...
                  </>
                ) : (
                  <>
                    Send Invitation
                    <Mail size={18} className="opacity-60" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
