const WorkspaceSkeleton = () => (
  <div className="bg-org-card-bg/60 border border-white/5 rounded-3xl p-6 space-y-6 animate-pulse">
    <div className="flex justify-between items-start">
      <div className="w-12 h-12 bg-white/5 rounded-2xl" />
      <div className="w-8 h-8 bg-white/5 rounded-lg" />
    </div>
    <div className="space-y-3">
      <div className="h-6 w-3/4 bg-white/5 rounded-md" />
      <div className="h-4 w-full bg-white/5 rounded-md" />
      <div className="h-4 w-2/3 bg-white/10 rounded-md" />
    </div>
    <div className="pt-6 border-t border-white/5 flex gap-4">
      <div className="h-4 w-20 bg-white/5 rounded-md" />
      <div className="h-4 w-20 bg-white/5 rounded-md" />
    </div>
  </div>
);

export default WorkspaceSkeleton;
