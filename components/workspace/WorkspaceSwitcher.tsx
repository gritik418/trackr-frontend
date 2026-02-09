import { useGetWorkspacesQuery } from "@/features/workspace/workspace.api";
import { cn, getInitials } from "@/lib/utils";
import { Workspace } from "@/types/workspace/workspace.interface";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  isExpanded: boolean;
  workspace: Workspace | null;
};

const WorkspaceSwitcher = ({ isExpanded, workspace }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const { data } = useGetWorkspacesQuery(workspace?.organizationId || "", {
    skip: !workspace?.organizationId,
  });

  const router = useRouter();

  const handleSwitchWorkspace = (workspace: Workspace) => {
    if (!workspace || !workspace.slug) return;

    router.push(`/dashboard/${workspace.slug}`);
    setIsOpen(false);
  };

  useEffect(() => {
    if (data?.workspaces) {
      setWorkspaces(data.workspaces);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full mt-6 items-center justify-center flex shrink-0",
        isExpanded
          ? "py-2 px-4"
          : "justify-self-end ml-auto w-fit rounded-tl-xl rounded-bl-xl p-2 border-white/20 bg-white/15",
      )}
    >
      <button
        onClick={toggleDropdown}
        className={cn(
          "w-full flex cursor-pointer items-center gap-3 rounded-xl border transition-all duration-200 group text-left",
          isOpen
            ? "border-brand bg-brand/10"
            : "border-dashboard-border bg-dashboard-item-bg hover:bg-dashboard-item-bg-hover",
          isExpanded ? "p-2" : "border-0 w-fit p-0",
        )}
      >
        {/* Icon / Avatar */}
        {workspace?.iconUrl ? (
          <Image
            src={workspace?.iconUrl}
            alt="Workspace Icon"
            width={40}
            height={40}
            className="rounded-2xl w-10 h-10 object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-black">
              {getInitials(workspace?.name || "")}
            </span>
          </div>
        )}

        {/* Label & Arrow */}
        {isExpanded && (
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">
              {workspace?.name}
            </p>
            <p className="text-[10px] text-neutral-500 truncate">Workspace</p>
          </div>
        )}
        {isExpanded && (
          <ChevronDown
            size={14}
            className={cn(
              "text-neutral-500 transition-transform duration-200 shrink-0 mr-1",
              isOpen && "rotate-180",
            )}
          />
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: isExpanded ? 10 : 0,
              x: isExpanded ? 0 : -10,
              scale: 0.95,
            }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute z-50 overflow-hidden rounded-xl border border-white/10 bg-neutral-900/90 backdrop-blur-xl shadow-2xl p-1.5 min-w-[220px]",
              isExpanded
                ? "top-full mt-2 left-4 right-4"
                : "left-full ml-2 top-0",
            )}
          >
            <div className="px-2 py-1.5 mb-1">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                My Workspaces
              </span>
            </div>

            <div className="space-y-0.5">
              {/* Current Workspace */}
              <button
                className="w-full cursor-pointer flex items-center gap-2.5 p-2 rounded-lg bg-brand/10 text-brand border border-brand/20 group text-left"
                onClick={() => setIsOpen(false)}
              >
                {workspace?.iconUrl ? (
                  <Image
                    src={workspace?.iconUrl}
                    alt="Workspace Icon"
                    width={32}
                    height={32}
                    className="rounded-lg w-8 h-8 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-black">
                      {getInitials(workspace?.name || "")}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate">
                    {workspace?.name}
                  </p>
                </div>
                <Check size={14} className="shrink-0" />
              </button>

              {/* Other Workspaces (Mock) */}
              {workspaces?.map((ws) => {
                if (ws.id === workspace?.id) return null;
                return (
                  <button
                    key={ws.id}
                    className="w-full cursor-pointer flex items-center gap-2.5 p-2 rounded-lg text-dashboard-item-text hover:text-white hover:bg-white/5 transition-all text-left group"
                    onClick={() => handleSwitchWorkspace(ws)}
                  >
                    {ws?.iconUrl ? (
                      <Image
                        src={ws.iconUrl}
                        alt="Workspace Icon"
                        width={32}
                        height={32}
                        className="rounded-lg w-8 h-8 object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/30 transition-colors">
                        <span className="text-[10px] font-bold text-indigo-300">
                          {getInitials(ws.name)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{ws.name}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkspaceSwitcher;
