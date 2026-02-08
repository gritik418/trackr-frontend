import { zodResolver } from "@hookform/resolvers/zod";
import { FolderPlus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  createProjectSchema,
  CreateProjectFormData,
} from "@/lib/schemas/project/create-project.schema";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProjectFormData) => void;
  isSubmitting?: boolean;
};

const CreateProjectModal = ({
  open,
  onClose,
  onSubmit,
  isSubmitting = false,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-4xl bg-dashboard-card-bg/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50 animate-in zoom-in-95 fade-in duration-300">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-3xl -mr-16 -mt-16 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-brand/10 border border-brand/20">
              <FolderPlus size={22} className="text-brand" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Create Project
              </h3>
              <p className="text-xs text-neutral-400 font-medium">
                Set up a new initiative for your team
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 cursor-pointer hover:bg-white/5 rounded-xl transition-all text-neutral-400 hover:text-white group"
          >
            <X
              size={20}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="space-y-4">
            {/* Project Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-400">
                Project Name
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="e.g. Website Overhaul"
                className="w-full px-5 py-3.5 bg-white/5 rounded-xl text-white border border-white/10 outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/40 transition-all placeholder:text-neutral-700 font-medium"
                autoFocus
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {String(errors.name.message)}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-400">
                Description (Optional)
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="What is this project about?"
                className="w-full px-5 py-3.5 bg-white/5 rounded-xl text-white border border-white/10 outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/40 transition-all placeholder:text-neutral-700 font-medium resize-none"
              />
              {errors.description?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {String(errors.description.message)}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-6 border-t border-white/5">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 cursor-pointer px-4 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/5 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[1.8] cursor-pointer px-4 py-3.5 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover shadow-xl shadow-brand/20 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
