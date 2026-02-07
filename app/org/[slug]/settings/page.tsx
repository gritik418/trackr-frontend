"use client";

import ConfirmOrganizationDeletionModal from "@/components/org/ConfirmOrganizationDeletionModal";
import { APP_DOMAIN } from "@/constants/index";
import {
  useDeleteOrganizationMutation,
  useUpdateOrganizationMutation,
} from "@/features/organization/organization.api";
import { selectOrganization } from "@/features/organization/organization.slice";
import updateOrganizationSchema from "@/lib/schemas/organization/update-organization.schema";
import { UpdateOrganizationDto } from "@/types/organization/update-organization.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Globe, Mail, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiDetail } from "react-icons/bi";
import { IoImage } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function OrgSettingsPage() {
  const organization = useSelector(selectOrganization);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [updateOrganization] = useUpdateOrganizationMutation();
  const [deleteOrganization] = useDeleteOrganizationMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UpdateOrganizationDto>({
    resolver: zodResolver(updateOrganizationSchema),
    defaultValues: {
      name: organization?.name || "",
      description: organization?.description || "",
      logoUrl: organization?.logoUrl || "",
      websiteUrl: organization?.websiteUrl || "",
      contactEmail: organization?.contactEmail || "",
    },
  });

  const onSubmit = async (data: UpdateOrganizationDto) => {
    if (!organization) {
      return;
    }
    try {
      await updateOrganization({ id: organization.id, ...data });
      toast.success("Organization updated successfully!");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update organization";

      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach((key) => {
          setError(key as keyof UpdateOrganizationDto, {
            type: "server",
            message: error.response.data.errors[key],
          });
        });
      }

      toast.error(Array.isArray(message) ? message[0] : message);
    }
  };

  const handleDelete = async () => {
    if (!organization || !organization.id) return;

    try {
      await deleteOrganization(organization.id).unwrap();
      toast.success("Organization deleted successfully");
      setShowDeleteModal(false);
      router.push("/org");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete organization");
    }
  };

  const generateOrgInitials = (orgName: string) => {
    const initials = orgName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    if (initials.length > 3) {
      return orgName.charAt(0);
    }

    return initials;
  };

  if (!organization) return null;

  return (
    <>
      <div className="space-y-10 flex flex-col flex-1 animate-in fade-in duration-700 pb-10 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white to-white/60 tracking-tight">
            Settings
          </h2>
          <p className="text-org-item-text mt-2 text-lg font-light">
            Manage your organization details, billing, and member access.
          </p>
        </div>

        <div className="grid gap-8">
          {/* General Information Card */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <Building2 size={20} className="text-brand" />
              <h3 className="text-lg font-semibold text-white">
                General Information
              </h3>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative z-10 p-8 rounded-3xl bg-org-card-bg/60 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/20 space-y-8"
            >
              {/* Logo Upload */}
              <div className="flex justify-center items-center gap-6">
                {organization.logoUrl ? (
                  <Image
                    src={organization.logoUrl}
                    alt="Logo"
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-2xl"
                  />
                ) : (
                  <div className="w-32 h-32 relative rounded-2xl bg-linear-to-br from-brand/20 to-purple-600/20 flex items-center justify-center border border-dashed border-white/10 cursor-default">
                    <span className="text-2xl font-bold text-brand">
                      {generateOrgInitials(organization.name)}
                    </span>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 flex flex-col">
                  <label className="text-sm font-semibold text-org-item-text">
                    Organization Name
                  </label>
                  <div className="input-field-wrapper">
                    <input
                      {...register("name")}
                      type="text"
                      className="w-full px-4 py-2.5 bg-org-sidebar-bg rounded-xl text-white outline-none focus:ring-2 focus:ring-brand/20 transition-all placeholder:text-neutral-600"
                    />
                  </div>

                  {errors.name?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 flex flex-col">
                  <label
                    htmlFor="slug"
                    className="text-sm font-semibold text-org-item-text"
                  >
                    Organization Slug
                  </label>
                  <div className="input-field-wrapper relative flex items-center px-4! bg-org-sidebar-bg rounded-xl">
                    <label
                      htmlFor="slug"
                      className="h-full w-full opacity-0 absolute"
                    ></label>
                    <span className="text-neutral-500 text-sm whitespace-nowrap">
                      {APP_DOMAIN}/org/
                    </span>
                    <input
                      readOnly
                      value={organization.slug}
                      id="slug"
                      type="text"
                      className="w-full py-2.5 bg-transparent text-white outline-none ml-1 placeholder:text-neutral-600"
                    />
                  </div>
                </div>

                <div className="space-y-2 flex flex-col md:col-span-2">
                  <label className="text-sm font-semibold text-org-item-text">
                    Description
                  </label>
                  <div className="input-field-wrapper">
                    <div className="relative">
                      <BiDetail
                        size={16}
                        className="absolute left-4 top-3.5 text-neutral-500"
                      />
                      <textarea
                        {...register("description")}
                        rows={7}
                        placeholder="Describe your organization..."
                        className="w-full placeholder:text-base resize-none pl-10 pr-4 py-2.5 bg-org-sidebar-bg rounded-xl text-white outline-none focus:ring-2 focus:ring-brand/20 transition-all placeholder:text-neutral-600"
                      />
                    </div>
                  </div>

                  {errors.description?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 flex flex-col md:col-span-2">
                  <label className="text-sm font-semibold text-org-item-text">
                    Website URL
                  </label>
                  <div className="input-field-wrapper">
                    <div className="relative">
                      <Globe
                        size={16}
                        className="absolute left-4 top-3.5 text-neutral-500"
                      />
                      <input
                        {...register("websiteUrl")}
                        type="text"
                        placeholder="https://example.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-org-sidebar-bg rounded-xl text-white outline-none focus:ring-2 focus:ring-brand/20 transition-all placeholder:text-neutral-600"
                      />
                    </div>
                  </div>

                  {errors.websiteUrl?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.websiteUrl.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 flex flex-col md:col-span-2">
                  <label className="text-sm font-semibold text-org-item-text">
                    Website Logo
                  </label>
                  <div className="input-field-wrapper">
                    <div className="relative">
                      <IoImage
                        size={16}
                        className="absolute left-4 top-3.5 text-neutral-500"
                      />
                      <input
                        {...register("logoUrl")}
                        type="text"
                        placeholder="https://example.com/logo.png"
                        className="w-full pl-10 pr-4 py-2.5 bg-org-sidebar-bg rounded-xl text-white outline-none focus:ring-2 focus:ring-brand/20 transition-all placeholder:text-neutral-600"
                      />
                    </div>
                  </div>

                  {errors.logoUrl?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.logoUrl.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 flex flex-col md:col-span-2">
                  <label className="text-sm font-semibold text-org-item-text">
                    Contact Email
                  </label>
                  <div className="input-field-wrapper">
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-4 top-3.5 text-neutral-500"
                      />
                      <input
                        {...register("contactEmail")}
                        type="email"
                        placeholder="contact@example.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-org-sidebar-bg rounded-xl text-white outline-none focus:ring-2 focus:ring-brand/20 transition-all placeholder:text-neutral-600"
                      />
                    </div>
                  </div>

                  {errors.contactEmail?.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactEmail.message}
                    </p>
                  )}

                  <p className="text-xs text-neutral-500">
                    We'll use this for billing and security alerts.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-white/5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 cursor-pointer bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/20 transition-all"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </section>

          {/* Danger Zone */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <ShieldAlert size={20} className="text-red-500" />
              <h3 className="text-lg font-semibold text-red-500">
                Danger Zone
              </h3>
            </div>

            <div className="p-6 rounded-2xl bg-red-500/2 border border-red-500/10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-white font-medium">
                    Delete Organization
                  </h4>
                  <p className="text-sm text-red-200/60">
                    Permanently remove this organization and all its data. This
                    action is irreversible.
                  </p>
                </div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 cursor-pointer py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-sm font-bold transition-colors"
                >
                  Delete Organization
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      {showDeleteModal && (
        <ConfirmOrganizationDeletionModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          orgName={organization?.name || ""}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}
