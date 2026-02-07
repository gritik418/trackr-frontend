import { Shield, MoreVertical } from "lucide-react";

export function MembersSkeleton() {
  return (
    <div className="w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/5 bg-white/2">
            <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-right">
              Joined / Sent
            </th>
            <th className="px-6 py-4 w-10"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {[...Array(5)].map((_, i) => (
            <tr key={i} className="animate-pulse">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 shrink-0" />
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-32 bg-white/5 rounded-md" />
                    <div className="h-3 w-48 bg-white/5 rounded-md" />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="h-6 w-20 bg-white/5 rounded-full border border-white/10" />
              </td>
              <td className="px-6 py-4">
                <div className="h-6 w-24 bg-white/5 rounded-full border border-white/10" />
              </td>
              <td className="px-6 py-4 text-right">
                <div className="h-4 w-24 bg-white/5 rounded-md ml-auto" />
              </td>
              <td className="px-6 py-4 text-right">
                <div className="p-2 text-neutral-500/50">
                  <MoreVertical size={16} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
