import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  MoreVertical,
  UserMinus,
  Shield,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { OrganizationMember } from "@/types/organization/organization.interface";
import {
  useRemoveMemberMutation,
  useUpdateMemberRoleMutation,
} from "@/features/organization/organization.api";
import { toast } from "react-hot-toast";
import { ConfirmRemoveMemberModal } from "./ConfirmRemoveMemberModal";

type Props = {
  member: OrganizationMember;
};

export const MemberOptionsDropdown = ({ member }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const [removeMember, { isLoading: isRemoving }] = useRemoveMemberMutation();
  const [updateRole, { isLoading: isUpdatingRole }] =
    useUpdateMemberRoleMutation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 8,
        left: rect.right - 224,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
    }
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleRemoveMember = async () => {
    try {
      await removeMember({
        orgId: member.organizationId,
        memberId: member.id,
      }).unwrap();
      toast.success("Member removed successfully");
      setIsRemoveModalOpen(false);
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to remove member");
    }
  };

  const handleUpdateRole = async (newRole: "ADMIN" | "MEMBER") => {
    try {
      await updateRole({
        orgId: member.organizationId,
        memberId: member.id,
        role: newRole,
      }).unwrap();
      toast.success(`Role updated to ${newRole.toLowerCase()}`);
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  if (!mounted) return null;

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        disabled={isRemoving || isUpdatingRole}
        className={cn(
          "p-2 text-neutral-500 hover:text-white hover:bg-white/10 rounded-lg transition-all outline-none disabled:opacity-50",
          isOpen
            ? "opacity-100 bg-white/10 text-white"
            : "opacity-0 group-hover:opacity-100",
        )}
      >
        {isRemoving || isUpdatingRole ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <MoreVertical size={16} />
        )}
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownMenuRef}
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
            className="w-56 bg-[#0A0A0B] border border-white/10 rounded-2xl shadow-2xl py-2 z-9999 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="px-3 py-2 border-b border-white/5 mb-1.5">
              <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                Manage Member
              </p>
            </div>

            <div className="p-1.5 space-y-1">
              {member.role !== "ADMIN" && (
                <button
                  onClick={() => handleUpdateRole("ADMIN")}
                  disabled={isUpdatingRole}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors font-medium group disabled:opacity-50"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={16} />
                  </div>
                  <div className="text-left">
                    <p className="leading-none">Make Admin</p>
                    <p className="text-[10px] text-neutral-500 mt-1">
                      Full organization access
                    </p>
                  </div>
                </button>
              )}

              {member.role !== "MEMBER" && (
                <button
                  onClick={() => handleUpdateRole("MEMBER")}
                  disabled={isUpdatingRole}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors font-medium group disabled:opacity-50"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                    <Shield size={16} />
                  </div>
                  <div className="text-left">
                    <p className="leading-none">Make Member</p>
                    <p className="text-[10px] text-neutral-500 mt-1">
                      Limited dashboard access
                    </p>
                  </div>
                </button>
              )}
            </div>

            <div className="my-1 border-t border-white/5 mx-2" />

            <div className="p-1.5">
              <button
                onClick={() => {
                  setIsRemoveModalOpen(true);
                  setIsOpen(false);
                }}
                disabled={isRemoving}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-500/10 transition-colors font-medium group disabled:opacity-50"
              >
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                  <UserMinus size={16} />
                </div>
                <div className="text-left">
                  <p className="leading-none">Remove Member</p>
                  <p className="text-[10px] text-red-500/60 mt-1">
                    Remove from org
                  </p>
                </div>
              </button>
            </div>
          </div>,
          document.body,
        )}

      <ConfirmRemoveMemberModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={handleRemoveMember}
        memberName={member.user.name}
        memberEmail={member.user.email}
        isLoading={isRemoving}
      />
    </>
  );
};
