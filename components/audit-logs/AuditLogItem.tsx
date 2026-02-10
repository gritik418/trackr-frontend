import React from "react";
import {
  Users,
  ShieldAlert,
  Settings,
  LogOut,
  LogIn,
  Plus,
  Trash2,
  Edit,
  Mail,
  CheckCircle2,
  ChevronRight,
  Search,
  Laptop,
  Globe,
  Activity,
} from "lucide-react";
import { format } from "date-fns";
import {
  AuditLog,
  AuditAction,
} from "../../features/audit-logs/audit-logs.interface";

interface AuditLogItemProps {
  log: AuditLog;
  view: "table" | "list";
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const getActionUI = (action: string) => {
  const a = action.toUpperCase();
  if (a.includes("CREATE"))
    return {
      color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      icon: Plus,
    };
  if (a.includes("UPDATE"))
    return {
      color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      icon: Edit,
    };
  if (a.includes("DELETE"))
    return {
      color: "text-rose-400 bg-rose-400/10 border-rose-400/20",
      icon: Trash2,
    };
  if (a.includes("INVITE"))
    return {
      color: "text-violet-400 bg-violet-400/10 border-violet-400/20",
      icon: Mail,
    };
  if (a.includes("ACCEPT"))
    return {
      color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
      icon: CheckCircle2,
    };
  if (a.includes("LOGIN"))
    return {
      color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      icon: LogIn,
    };
  if (a.includes("LOGOUT"))
    return {
      color: "text-orange-400 bg-orange-400/10 border-orange-400/20",
      icon: LogOut,
    };
  return {
    color: "text-neutral-400 bg-neutral-400/10 border-neutral-400/20",
    icon: Activity,
  };
};

export const getEntityIcon = (type: string) => {
  const t = type.toUpperCase();
  if (t.includes("MEMBER")) return Users;
  if (t.includes("ORG")) return Settings;
  if (t.includes("WORKSPACE")) return Globe;
  return Search;
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const getHumanDescription = (log: AuditLog) => {
  const { action, details, entityType } = log;
  const d = details || {};

  const bold = (text: string) => (
    <span className="font-bold text-white/90">{text}</span>
  );
  const mono = (text: string) => (
    <code className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[11px] font-mono text-brand/80 mx-1">
      {text}
    </code>
  );

  switch (action) {
    case AuditAction.ORGANIZATION_CREATE:
      return <>Created the organization {bold(d.name || "New Organization")}</>;
    case AuditAction.ORGANIZATION_UPDATE:
      return <>Updated organization settings</>;
    case AuditAction.ORGANIZATION_MEMBER_REMOVE:
      return (
        <>
          Removed {bold(d.targetUserName || d.targetUserEmail || "a member")}{" "}
          from the organization
        </>
      );
    case AuditAction.ORGANIZATION_MEMBER_ROLE_UPDATE:
      return (
        <>
          Updated {bold(d.targetUserName || "member")}'s role to{" "}
          {mono(d.newRole)}
        </>
      );

    case AuditAction.WORKSPACE_CREATE:
      return <>Created workspace {bold(d.name || "New Workspace")}</>;
    case AuditAction.WORKSPACE_UPDATE:
      return <>Updated workspace {bold(d.name || "settings")}</>;
    case AuditAction.WORKSPACE_DELETE:
      return <>Deleted workspace {bold(d.name || "Workspace")}</>;

    case AuditAction.PROJECT_CREATE:
      return <>Created project {bold(d.name || "New Project")}</>;
    case AuditAction.PROJECT_UPDATE:
      return <>Updated project {bold(d.name || "settings")}</>;
    case AuditAction.PROJECT_DELETE:
      return <>Deleted project {bold(d.name || "Project")}</>;

    case AuditAction.TASK_CREATE:
      return <>Created task {bold(d.title || "New Task")}</>;
    case AuditAction.TASK_UPDATE:
      return <>Updated task {bold(d.title || "Task")}</>;
    case AuditAction.TASK_ASSIGN:
      return (
        <>
          Assigned task {bold(d.title || "Task")} to{" "}
          {bold(d.assigneeName || "user")}
        </>
      );

    default:
      return (
        <span className="capitalize">
          {action.toLowerCase().replace(/_/g, " ")} on{" "}
          {entityType.toLowerCase()}
        </span>
      );
  }
};

export const AuditLogItem: React.FC<AuditLogItemProps> = ({
  log,
  view,
  isExpanded,
  onToggleExpand,
}) => {
  const { color: actionColor, icon: ActionIcon } = getActionUI(log.action);
  const EntityIcon = getEntityIcon(log.entityType);
  const userInitials = getInitials(log.user?.name || "System");
  const description = getHumanDescription(log);

  if (view === "table") {
    return (
      <>
        <tr
          className="group hover:bg-white/2 transition-colors cursor-pointer"
          onClick={onToggleExpand}
        >
          <td className="px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 text-xs font-bold overflow-hidden shrink-0 shadow-inner">
                {log.user?.avatarUrl ? (
                  <img
                    src={log.user.avatarUrl}
                    alt={log.user.name}
                    className="w-full h-full object-cover"
                  />
                ) : log.user?.name === "System" ? (
                  <ShieldAlert size={16} />
                ) : (
                  userInitials
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white group-hover:text-brand transition-colors">
                  {log.user?.name || "System"}
                </span>
                <span className="text-[10px] text-neutral-500 font-medium tracking-tight">
                  {log.user?.email || "System Level Action"}
                </span>
              </div>
            </div>
          </td>
          <td className="px-6 py-5">
            <div className="flex flex-col gap-1">
              <div className="text-sm text-neutral-300 leading-relaxed">
                {description}
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold tracking-widest uppercase opacity-60`}
                >
                  <ActionIcon size={8} />
                  {log.action.split("_").pop()}
                </div>
                <div className="flex items-center gap-1 text-[9px] text-neutral-600 font-bold uppercase tracking-widest">
                  <EntityIcon size={10} />
                  {log.entityType.replace(/_/g, " ")}
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-5">
            <div className="flex flex-col gap-1">
              <div className="text-sm text-neutral-300 leading-relaxed">
                {log.entityType}
              </div>
            </div>
          </td>
          <td className="px-6 py-5 text-right">
            <div className="flex flex-col items-end">
              <span className="text-xs text-neutral-400 font-mono font-medium">
                {format(new Date(log.createdAt), "MMM d, HH:mm")}
              </span>
              <span className="text-[10px] text-neutral-600 font-mono">
                {format(new Date(log.createdAt), "ss")}s
              </span>
            </div>
          </td>

          <td className="py-5 pr-6 text-right">
            <div className="flex items-center justify-self-end gap-2 text-neutral-600">
              <div className="flex flex-col items-end justify-center">
                <span className="text-[10px] font-mono tracking-tight">
                  {log.ipAddress}
                </span>
                <div className="flex items-center gap-1 opacity-40">
                  <Laptop size={10} />
                  <span className="text-[8px] font-bold uppercase text-slate-400 tracking-widest">
                    Secure
                  </span>
                </div>
              </div>
            </div>
          </td>
        </tr>
        {isExpanded && (
          <tr className="bg-white/1 w-full border-b border-white/5">
            <td
              colSpan={5}
              className="px-12 py-6 w-full animate-in slide-in-from-top-2 duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity size={12} className="text-brand" />
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
                      Raw Transaction Data
                    </span>
                  </div>
                  <pre className="text-[11px] p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-brand/80 overflow-x-auto shadow-2xl leading-relaxed">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                </div>
                <div className="lg:col-span-4 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Globe size={12} className="text-neutral-500" />
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
                        Client Environment
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-mono leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5 break-all">
                      {log.userAgent}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="p-3 bg-white/2 border border-white/5 rounded-xl">
                      <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest block mb-1">
                        Resource ID
                      </span>
                      <code className="text-[10px] text-neutral-400 font-mono select-all">
                        {log.entityId}
                      </code>
                    </div>
                    <div className="p-3 bg-white/2 border border-white/5 rounded-xl">
                      <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest block mb-1">
                        Trace Signature
                      </span>
                      <code className="text-[10px] text-neutral-400 font-mono select-all">
                        {log.id}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        )}
      </>
    );
  }

  return (
    <div
      className={`group p-5 bg-white/2 hover:bg-white/5 border border-white/5 rounded-3xl transition-all duration-300 cursor-pointer ${isExpanded ? "ring-1 ring-brand/30 bg-white/5 shadow-xl shadow-black/40" : ""}`}
      onClick={onToggleExpand}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-white/10 via-white/5 to-transparent border border-white/10 flex items-center justify-center text-neutral-400 text-sm font-bold shrink-0 shadow-lg">
            {log.user?.avatarUrl ? (
              <img
                src={log.user.avatarUrl}
                alt={log.user.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : log.user?.name === "System" ? (
              <ShieldAlert size={24} className="text-brand/80" />
            ) : (
              userInitials
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-base font-bold text-white leading-none">
                {log.user?.name || "System"}
              </span>
              <div className="flex items-center gap-1.5 opacity-40">
                <div className="w-1 h-1 rounded-full bg-neutral-600" />
                <span className="text-[10px] text-neutral-500 font-mono">
                  {format(new Date(log.createdAt), "HH:mm")}
                </span>
              </div>
            </div>
            <div className="text-sm text-neutral-400 leading-normal">
              {description}
            </div>
            {!isExpanded && (
              <div className="flex items-center gap-3 mt-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-neutral-600">
                  <EntityIcon size={10} />
                  {log.entityType.replace(/_/g, " ")}
                </div>
                <div className="w-1 h-1 rounded-full bg-neutral-800" />
                <div
                  className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest ${actionColor} opacity-70`}
                >
                  <ActionIcon size={8} />
                  {log.action.split("_").pop()}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="px-2 py-1 rounded bg-black/40 border border-white/5 text-[10px] text-neutral-500 font-mono">
            {log.ipAddress}
          </div>
          <ChevronRight
            size={18}
            className={`transition-all duration-300 ${isExpanded ? "rotate-90 text-brand" : "text-neutral-700 opacity-20 group-hover:opacity-50"}`}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <div className="w-1.5 h-1.5 rounded-full bg-brand" />
              <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-[0.2em]">
                Transaction Metadata
              </span>
            </div>
            <pre className="text-[10px] p-4 rounded-2xl bg-black/60 border border-white/5 font-mono text-brand/80 overflow-x-auto max-h-[250px] shadow-inner leading-relaxed">
              {JSON.stringify(log.details, null, 2)}
            </pre>
          </div>
          <div className="flex flex-col justify-between space-y-6">
            <div className="p-4 rounded-2xl bg-white/2 border border-white/5 shadow-inner">
              <div className="flex items-center gap-2 mb-3 text-neutral-500">
                <Laptop size={14} className="text-brand/60" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                  Client Fingerprint
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-mono break-all opacity-80">
                {log.userAgent}
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 p-3 bg-black/20 rounded-xl border border-white/5">
                <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest block mb-1">
                  Entity Reference
                </span>
                <code className="text-[10px] text-neutral-500 font-mono">
                  {log.entityId}
                </code>
              </div>
              <div className="flex-1 p-3 bg-black/20 rounded-xl border border-white/5">
                <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest block mb-1">
                  Sequence ID
                </span>
                <code className="text-[10px] text-neutral-500 font-mono">
                  {log.id}
                </code>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
