"use client";

import { ExternalLink } from "lucide-react";

interface TaskResourcesProps {
  links: {
    id: string;
    title?: string | null;
    url: string;
  }[];
}

export function TaskResources({ links }: TaskResourcesProps) {
  if (!links || links.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-px bg-brand/30" />
        <span className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">
          Resources
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-brand/30 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand/10 text-brand">
                <ExternalLink size={16} />
              </div>
              <span className="text-sm font-bold text-white group-hover:text-brand transition-colors">
                {link.title || "Untitled Link"}
              </span>
            </div>
            <span className="text-[10px] text-neutral-500 font-mono truncate max-w-[120px]">
              {new URL(link.url).hostname}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
