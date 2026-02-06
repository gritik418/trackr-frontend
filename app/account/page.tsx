"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/providers/AuthProvider";
import { updateMe, updateAvatar } from "@/features/user/user.service";
import updateUserSchema from "@/lib/schemas/user/update-user.schema";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  AtSign,
  Save,
  Loader2,
  Sparkles,
  Shield,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UpdateUserDto } from "@/types/user/update-user.interface";

export default function ProfilePage() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UpdateUserDto>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        username: user.username,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UpdateUserDto) => {
    try {
      await updateMe(data);
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update profile";
      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setIsUploadingAvatar(true);
    try {
      await updateAvatar(formData);
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast.success("Avatar updated successfully!");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update avatar";
      toast.error(Array.isArray(message) ? message[0] : message);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "??"
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white/5 to-transparent border border-white/10 p-8">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Sparkles size={120} className="text-brand rotate-12" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative group">
            <div
              className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-linear-to-tr from-brand to-brand-secondary p-[3px] shadow-2xl shadow-brand/20 transition-transform group-hover:scale-105 duration-300 relative overflow-hidden cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-full h-full rounded-[21px] bg-bg-dark-1 flex items-center justify-center overflow-hidden relative">
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                    {getInitials(user?.name)}
                  </span>
                )}

                {/* Upload Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  {isUploadingAvatar ? (
                    <Loader2 size={32} className="text-white animate-spin" />
                  ) : (
                    <Camera size={32} className="text-white" />
                  )}
                </div>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />

            <div className="absolute -bottom-2 -right-2 bg-bg-dark-0 border border-white/10 rounded-xl p-2 shadow-xl">
              <Shield size={16} className="text-brand" />
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
              {user?.name}
            </h2>
            <p className="text-neutral-500 font-medium mt-1 flex items-center justify-center md:justify-start gap-2">
              <AtSign size={14} className="text-brand/60" />
              {user?.username}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                Product Designer
              </span>
              <span className="px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-[10px] font-bold uppercase tracking-widest text-brand">
                Pro Member
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="rounded-3xl bg-bg-dark-1/50 border border-white/5 shadow-2xl overflow-hidden">
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-bold flex items-center gap-2">
            <User size={18} className="text-brand" />
            Personal Information
          </h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs font-bold text-brand hover:text-white transition-colors px-4 py-2 rounded-xl bg-brand/10 hover:bg-brand"
            >
              Edit Profile
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <div
                className={cn(
                  "input-field-wrapper transition-all",
                  !isEditing && "opacity-60 cursor-not-allowed group",
                )}
              >
                <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
                  <input
                    {...register("name")}
                    disabled={!isEditing}
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl disabled:cursor-not-allowed"
                  />
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                    size={18}
                  />
                </div>
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs mt-1 ml-1 font-medium">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1">
                Username
              </label>
              <div
                className={cn(
                  "input-field-wrapper transition-all",
                  !isEditing && "opacity-60 cursor-not-allowed",
                )}
              >
                <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
                  <input
                    {...register("username")}
                    disabled={!isEditing}
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl disabled:cursor-not-allowed"
                  />
                  <AtSign
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                    size={18}
                  />
                </div>
              </div>
              {errors.username && (
                <p className="text-red-400 text-xs mt-1 ml-1 font-medium">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email Field (Disabled) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                Email Address
                <span className="text-[10px] lowercase font-normal italic opacity-60">
                  (Cannot be changed)
                </span>
              </label>
              <div className="input-field-wrapper opacity-40 cursor-not-allowed">
                <div className="bg-bg-dark-2 rounded-[11px] relative h-full">
                  <input
                    value={user?.email || ""}
                    disabled
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent border-none outline-none text-white placeholder:text-neutral-600 font-medium rounded-xl cursor-not-allowed"
                  />
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                    size={18}
                  />
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
              <button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3.5 bg-brand text-bg-dark-0 font-bold rounded-2xl shadow-lg shadow-brand/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
              >
                {isSubmitting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
                className="flex-1 md:flex-none px-8 py-3.5 bg-white/5 text-neutral-400 font-bold rounded-2xl border border-white/10 hover:bg-white/10 hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Safety Section */}
      <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h4 className="font-bold text-red-500">Security & Account</h4>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm">
            Think your account has been compromised? Change your password or
            enable two-factor authentication.
          </p>
        </div>
        <button className="px-6 py-2.5 bg-white/5 text-xs font-bold text-red-500 rounded-xl border border-red-500/20 hover:bg-red-500/10 transition-all">
          Security Settings
        </button>
      </div>
    </div>
  );
}
