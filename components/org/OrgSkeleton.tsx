const OrgSkeleton = () => (
  <div className="bg-[#0A0A0B] border border-white/8 rounded-2xl p-6 space-y-6 animate-pulse">
    <div className="flex justify-between items-start">
      <div className="w-14 h-14 bg-white/5 rounded-xl" />
      <div className="w-16 h-5 bg-white/5 rounded-full" />
    </div>
    <div className="space-y-3">
      <div className="h-6 w-3/4 bg-white/5 rounded-md" />
      <div className="h-4 w-1/2 bg-white/5 rounded-md" />
    </div>
    <div className="pt-6 border-t border-white/6 flex justify-between">
      <div className="h-4 w-24 bg-white/5 rounded-md" />
      <div className="h-4 w-12 bg-white/5 rounded-md" />
    </div>
  </div>
);

export default OrgSkeleton;
