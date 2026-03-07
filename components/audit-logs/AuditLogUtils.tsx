import {
  Activity,
  CheckCircle2,
  Edit,
  Mail,
  Plus,
  Trash2,
  LogIn,
  LogOut,
  Building,
  Users,
  Layers,
  MessageSquare,
} from "lucide-react";
import React from "react";
import { FaSuitcase, FaTasks, FaUsersCog } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import {
  AuditAction,
  AuditEntityType,
  AuditLog,
} from "../../features/audit-logs/audit-logs.interface";

export const getActionUI = (action: string) => {
  const a = action.toUpperCase();
  if (a.includes("CREATE"))
    return {
      color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      theme: "emerald",
      icon: Plus,
    };
  if (a.includes("UPDATE"))
    return {
      color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
      theme: "blue",
      icon: Edit,
    };
  if (a.includes("DELETE"))
    return {
      color: "text-rose-400 bg-rose-400/10 border-rose-400/20",
      theme: "rose",
      icon: Trash2,
    };
  if (a.includes("INVITE"))
    return {
      color: "text-violet-400 bg-violet-400/10 border-violet-400/20",
      theme: "violet",
      icon: Mail,
    };
  if (a.includes("ACCEPT"))
    return {
      color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
      theme: "indigo",
      icon: CheckCircle2,
    };
  if (a.includes("LOGIN"))
    return {
      color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      theme: "amber",
      icon: LogIn,
    };
  if (a.includes("LOGOUT"))
    return {
      color: "text-orange-400 bg-orange-400/10 border-orange-400/20",
      theme: "orange",
      icon: LogOut,
    };
  return {
    color: "text-neutral-400 bg-neutral-400/10 border-neutral-400/20",
    theme: "neutral",
    icon: Activity,
  };
};

export const getEntityTypeUi = (entityType: AuditEntityType) => {
  const containerClass =
    "flex items-center font-semibold text-white/70 text-[10px] gap-1";

  const iconClass = "text-brand/80 text-xs h-3 w-3";

  switch (entityType) {
    case AuditEntityType.ORGANIZATION:
      return (
        <div className={containerClass}>
          <Building className={iconClass} />
          Organization
        </div>
      );
    case AuditEntityType.ORGANIZATION_MEMBER:
      return (
        <div className={containerClass}>
          <Users className={iconClass} />
          Organization Member
        </div>
      );
    case AuditEntityType.WORKSPACE:
      return (
        <div className={containerClass}>
          <Layers className={iconClass} />
          Workspace
        </div>
      );
    case AuditEntityType.WORKSPACE_MEMBER:
      return (
        <div className={containerClass}>
          <FaUsers className={iconClass} />
          Workspace Member
        </div>
      );
    case AuditEntityType.PROJECT:
      return (
        <div className={containerClass}>
          <FaSuitcase className={iconClass} />
          Project
        </div>
      );
    case AuditEntityType.PROJECT_MEMBER:
      return (
        <div className={containerClass}>
          <FaUsersCog className={iconClass} />
          Project Member
        </div>
      );
    case AuditEntityType.TASK:
      return (
        <div className={containerClass}>
          <FaTasks className={iconClass} />
          Task
        </div>
      );
    case AuditEntityType.ORGANIZATION_INVITE:
    case AuditEntityType.WORKSPACE_INVITE:
      return (
        <div className={containerClass}>
          <Mail className={iconClass} />
          Invite
        </div>
      );
    case AuditEntityType.COMMENT:
      return (
        <div className={containerClass}>
          <MessageSquare className={iconClass} />
          Comment
        </div>
      );
    default:
      return "Unknown";
  }
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

  const getAssigneeNames = (assignees: any[]) => {
    if (!assignees || !Array.isArray(assignees) || assignees.length === 0)
      return "someone";
    const names = assignees.map((a) => a.name || a.email || "User");
    if (names.length === 1) return names[0];
    if (names.length === 2) return `${names[0]} and ${names[1]}`;
    return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
  };

  switch (action) {
    case AuditAction.TASK_CREATE:
      return <>Created task {bold(d.title || "New Task")}</>;
    case AuditAction.TASK_UPDATE:
      if (d.status) return <>Marked task as {mono(d.status)}</>;
      if (d.priority) return <>Set task priority to {mono(d.priority)}</>;
      if (d.title) return <>Renamed task to {bold(d.title)}</>;
      return <>Updated details for task {bold(d.title || "Task")}</>;
    case AuditAction.TASK_ASSIGN:
      return <>Assigned task to {bold(getAssigneeNames(d.assignedTo))}</>;
    case AuditAction.TASK_UNASSIGN:
      return (
        <>Unassigned task from {bold(getAssigneeNames(d.unassignedFrom))}</>
      );
    case AuditAction.PROJECT_CREATE:
      return <>Created project {bold(d.name || "New Project")}</>;
    case AuditAction.PROJECT_UPDATE:
      if (d.status) return <>Changed project status to {mono(d.status)}</>;
      return <>Updated project {bold(d.name || "settings")}</>;
    case AuditAction.WORKSPACE_MEMBER_ADD:
      return <>Added {bold(d.targetUserName || "a member")} to the workspace</>;
    case AuditAction.WORKSPACE_UPDATE:
      return <>Updated workspace settings</>;
    default:
      return (
        <span className="capitalize">
          {action.toLowerCase().replace(/_/g, " ")} on{" "}
          {entityType.toLowerCase()}
        </span>
      );
  }
};
