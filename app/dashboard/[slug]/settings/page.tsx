"use client";

import { APP_DOMAIN } from "@/constants/index";
import { selectWorkspace } from "@/features/workspace/workspace.slice";
import { getInitials } from "@/lib/utils";
import { Layout, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiDetail } from "react-icons/bi";
import { IoImage } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function WorkspaceSettingsPage() {
  const workspace = useSelector(selectWorkspace);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: workspace?.name || "",
      description: workspace?.description || "",
      iconUrl: workspace?.iconUrl || "",
    },
  });

  const onSubmit = async (data: any) => {
    alert("In-progress: Workspace settings update functionality.");
  };

  if (!workspace) return null;

  return (
    <div className="space-y-10 flex flex-col flex-1 animate-in fade-in duration-700 pb-10 relative overflow-hidden">
      {/* Background Ambience - Indigo themed for Workspace */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">
          Workspace Settings
        </h2>
        <p className="text-neutral-400 mt-2 text-lg font-light">
          Manage your workspace details, branding, and visibility.
        </p>
      </div>

      <div className="grid gap-8">
        {/* General Information Card */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2">
            <Layout size={20} className="text-brand" />
            <h3 className="text-lg font-semibold text-white">
              General Information
            </h3>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10 p-8 rounded-3xl bg-dashboard-card-bg/60 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/20 space-y-8"
          >
            {/* Workspace Icon / Avatar */}
            <div className="flex justify-center items-center gap-6">
              {workspace.iconUrl ? (
                <Image
                  src={workspace.iconUrl}
                  alt="Workspace Icon"
                  width={200}
                  height={200}
                  className="w-32 h-32 object-cover rounded-2xl border border-white/10"
                />
              ) : (
                <div className="w-32 h-32 relative rounded-2xl bg-linear-to-br from-indigo-500/20 to-brand/20 flex items-center justify-center border border-dashed border-white/15 cursor-default group overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
                  <span className="relative text-3xl font-bold text-white/80 drop-shadow-lg">
                    {getInitials(workspace.name)}
                  </span>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 flex flex-col">
                <label className="text-sm font-semibold text-neutral-400">
                  Workspace Name
                </label>
                <div className="relative">
                  <input
                    {...register("name")}
                    type="text"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-white outline-none focus:ring-2 focus:ring-brand/20 transition-all placeholder:text-neutral-600 font-medium"
                  />
                </div>
                {errors.name?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {String(errors.name.message)}
                  </p>
                )}
              </div>

              <div className="space-y-2 flex flex-col">
                <label
                  htmlFor="slug"
                  className="text-sm font-semibold text-neutral-400"
                >
                  Workspace Slug
                </label>
                <div className="relative flex items-center px-4 bg-white/5 border border-white/5 rounded-xl opacity-60">
                  <span className="text-neutral-500 text-sm whitespace-nowrap">
                    {APP_DOMAIN}/dashboard/
                  </span>
                  <input
                    readOnly
                    value={workspace.slug}
                    id="slug"
                    type="text"
                    className="w-full py-2.5 bg-transparent text-white outline-none ml-1 cursor-not-allowed font-medium"
                  />
                </div>
                <p className="text-[10px] text-neutral-500 italic">
                  Slugs are unique identifiers and cannot be changed.
                </p>
              </div>

              <div className="space-y-2 flex flex-col md:col-span-2">
                <label className="text-sm font-semibold text-neutral-400">
                  Description
                </label>
                <div className="relative">
                  <BiDetail
                    size={16}
                    className="absolute left-4 top-3.5 text-neutral-500"
                  />
                  <textarea
                    {...register("description")}
                    rows={4}
                    placeholder="Describe the purpose of this workspace..."
                    className="w-full placeholder:text-neutral-600 resize-none pl-10 pr-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-white outline-none focus:ring-2 focus:ring-brand/20 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2 flex flex-col md:col-span-2">
                <label className="text-sm font-semibold text-neutral-400">
                  Workspace Icon URL
                </label>
                <div className="relative">
                  <IoImage
                    size={16}
                    className="absolute left-4 top-3.5 text-neutral-500"
                  />
                  <input
                    {...register("iconUrl")}
                    type="text"
                    placeholder="https://example.com/icon.png"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/5 rounded-xl text-white outline-none focus:ring-2 focus:ring-brand/20 transition-all placeholder:text-neutral-600 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2.5 cursor-pointer bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all active:scale-95"
              >
                {isSubmitting ? "Updating..." : "Update Settings"}
              </button>
            </div>
          </form>
        </section>

        {/* Danger Zone */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2">
            <ShieldAlert size={20} className="text-red-500/80" />
            <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-600">
              Danger Zone
            </h3>
          </div>

          <div className="p-6 rounded-3xl bg-red-500/2 backdrop-blur-sm border border-red-500/10 space-y-6 relative overflow-hidden group">
            {/* Subtle red glow on hover */}
            <div className="absolute -inset-1 bg-red-500/0 group-hover:bg-red-500/5 transition-colors duration-500 pointer-events-none blur-xl" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-white font-semibold flex items-center gap-2">
                  Delete Workspace
                </h4>
                <p className="text-sm text-neutral-500 max-w-md">
                  This action is irreversible. All projects, tasks, and data
                  within this workspace will be lost permanently.
                </p>
              </div>
              <button
                onClick={() =>
                  alert("In-progress: Workspace deletion functionality.")
                }
                className="px-6 py-2.5 cursor-pointer bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-black/20"
              >
                Delete Workspace
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
