"use client";

import { APP_CONFIG } from "@/constants";
import { selectOrganization } from "@/features/organization/organization.slice";
import { useCreateWorkspaceMutation } from "@/features/workspace/workspace.api";
import { CreateWorkspaceRequest } from "@/features/workspace/workspace.interface";
import createWorkspaceSchema, {
  CreateWorkspaceDto,
} from "@/lib/schemas/workspace/create-workspace.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Building2,
  ChevronRight,
  Globe,
  Link as LinkIcon,
  Loader2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function CreateWorkspacePage() {
  const router = useRouter();
  const organization = useSelector(selectOrganization);
  const [createWorkspace] = useCreateWorkspaceMutation();
  const [isAutoSlug, setIsAutoSlug] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateWorkspaceDto>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      slug: "",
      iconUrl: "",
      description: "",
    },
  });

  const nameValue = watch("name");
  const slugValue = watch("slug");

  useEffect(() => {
    if (isAutoSlug && nameValue) {
      const generatedSlug = nameValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [nameValue, isAutoSlug, setValue]);

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAutoSlug(false);
    setValue("slug", e.target.value.toLowerCase(), { shouldValidate: true });
  };

  const onSubmit = async (data: CreateWorkspaceDto) => {
    if (!organization?.id) return;

    try {
      const response = await createWorkspace({
        orgId: organization.id,
        body: data as CreateWorkspaceRequest,
      }).unwrap();

      if (response.success) {
        toast.success("Workspace created successfully!");
        router.push(`/org/${organization.slug}/workspaces`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create workspace");
    }
  };

  if (!organization) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Navigation Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm font-medium text-neutral-500">
        <Link
          href={`/org/${organization.slug}/workspaces`}
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          Workspaces
        </Link>
        <ChevronRight size={14} />
        <span className="text-white">New Workspace</span>
      </nav>

      {/* Header Section */}
      <div className="relative p-8 rounded-3xl bg-bg-dark-1 border border-white/5 overflow-hidden group">
        <div className="absolute top-0 right-0 p-32 bg-brand/10 filter blur-[80px] rounded-full translate-x-10 -translate-y-10 group-hover:opacity-20 transition-opacity duration-700"></div>
        <div className="relative z-10 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 flex items-center justify-center mb-4">
            <Building2 size={32} className="text-brand" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Create a New Workspace
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl font-light">
            Keep your projects and team syncronized in one place.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="p-8 rounded-3xl bg-bg-dark-1 border border-white/5 space-y-6">
              {/* Workspace Name & Slug */}
              <div className="grid justify-between grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-1">
                  <div className="space-y-1 flex flex-col justify-between">
                    <label
                      htmlFor="name"
                      className="text-sm h-5 font-bold text-neutral-300 ml-1"
                    >
                      Workspace Name
                    </label>
                    <div className="relative group/input">
                      <Building2
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within/input:text-brand transition-colors"
                        size={18}
                      />
                      <input
                        {...register("name")}
                        id="name"
                        type="text"
                        placeholder="e.g. Design System"
                        className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${
                          errors.name ? "border-red-500/50" : "border-white/10"
                        } rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all duration-300 font-medium`}
                      />
                    </div>
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-xs font-medium ml-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1 flex flex-col">
                  <label
                    htmlFor="slug"
                    className="text-sm h-5  font-bold text-neutral-300 ml-1 flex items-baseline justify-between relative"
                  >
                    <span>Slug</span>
                    {!isAutoSlug && (
                      <button
                        type="button"
                        onClick={() => setIsAutoSlug(true)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-[8px] text-brand hover:underline font-bold uppercase tracking-wider"
                      >
                        Reset to Auto
                      </button>
                    )}
                  </label>
                  <div className="relative group/input">
                    <LinkIcon
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within/input:text-brand transition-colors"
                      size={18}
                    />
                    <input
                      {...register("slug")}
                      id="slug"
                      type="text"
                      onChange={handleSlugChange}
                      placeholder="design-system"
                      className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${
                        errors.slug ? "border-red-500/50" : "border-white/10"
                      } rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all duration-300 font-medium`}
                    />
                  </div>
                  {errors.slug && (
                    <p className="text-red-500 text-xs font-medium ml-1">
                      {errors.slug.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Icon URL */}
              <div className="space-y-1 flex flex-col justify-between">
                <label
                  htmlFor="iconUrl"
                  className="text-sm h-5 font-bold text-neutral-300 ml-1 flex items-baseline justify-between relative"
                >
                  Icon URL (Optional)
                </label>
                <div className="relative group/input">
                  <Globe
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within/input:text-brand transition-colors"
                    size={18}
                  />
                  <input
                    {...register("iconUrl")}
                    id="iconUrl"
                    type="text"
                    placeholder="https://example.com/icon.png"
                    className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${
                      errors.iconUrl ? "border-red-500/50" : "border-white/10"
                    } rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all duration-300 font-medium`}
                  />
                  {watch("iconUrl") && !errors.iconUrl && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-white/10 overflow-hidden border border-white/10">
                      <img
                        src={watch("iconUrl") || ""}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                {errors.iconUrl && (
                  <p className="text-red-500 text-xs font-medium ml-1">
                    {errors.iconUrl.message}
                  </p>
                )}
              </div>

              {/* Workspace Description */}
              <div className="space-y-1 flex flex-col justify-between">
                <label
                  htmlFor="description"
                  className="text-sm h-5 font-bold text-neutral-300 ml-1"
                >
                  Description (Optional)
                </label>
                <textarea
                  {...register("description")}
                  id="description"
                  rows={4}
                  placeholder="What is this workspace about?"
                  className={`w-full px-6 py-4 bg-white/5 border ${
                    errors.description ? "border-red-500/50" : "border-white/10"
                  } rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50 transition-all duration-300 font-medium resize-none`}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs font-medium ml-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                href={`/org/${organization.slug}/workspaces`}
                className="flex-1 lg:flex-none px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-center flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-2 cursor-pointer lg:flex-none lg:min-w-[240px] px-8 py-4 bg-brand text-bg-dark-0 font-black rounded-2xl hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Create Workspace
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-linear-to-br from-brand/10 to-brand-secondary/5 border border-brand/10 space-y-4">
            <h3 className="text-brand font-bold flex items-center gap-2">
              <Sparkles size={18} />
              Slug Strategy
            </h3>
            <p className="text-xs text-brand/80 leading-relaxed">
              Slugs are unique identifiers used in URLs. We auto-generate them
              from your workspace name, but you can customize them to be shorter
              or more memorable.
            </p>
            <div className="pt-2">
              <div className="text-[10px] text-brand/40 font-bold uppercase tracking-widest mb-1.5">
                Preview URL
              </div>
              <div className="px-3 py-2 bg-brand/10 rounded-lg text-[11px] text-brand font-mono truncate border border-brand/20">
                {APP_CONFIG.BASE_URL}/dashboard/{slugValue || "your-slug"}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-bg-dark-1 border border-white/5">
            <h4 className="text-white font-bold mb-2 text-sm">
              Workspace Icons
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed mb-4">
              A workspace icon helps your team quickly identify projects.
              Provide a direct link to an image (PNG, JPG, or SVG).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
