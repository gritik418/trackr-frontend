export default function OrgSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">General Settings</h2>
        <p className="text-neutral-400">Manage your organization's general information.</p>
      </div>

      <div className="p-6 rounded-2xl bg-bg-dark-1 border border-white/5 space-y-6">
        <div className="space-y-4">
           <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300">
              Organization Name
            </label>
            <input
              type="text"
              defaultValue="Acme Corp"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
            />
          </div>
          
           <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300">
              Logo
            </label>
             <div className="flex items-center gap-4">
               <div className="w-16 h-16 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-500 font-bold text-xl">
                 AC
               </div>
               <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors">
                 Change Logo
               </button>
             </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-white/5 flex justify-end">
          <button className="px-6 py-2 bg-brand text-bg-dark-0 font-bold rounded-xl hover:bg-brand-hover transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
