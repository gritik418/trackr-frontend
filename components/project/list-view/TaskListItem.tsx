import { Task } from "@/features/task/task.interface";
import { AlertCircle, Clock, TagIcon } from "lucide-react";
import Image from "next/image";

type Props = {
  task: Task;
  onTaskClick?: (task: Task) => void;
  priorityColors: Record<string, string>;
  statusIcons: Record<string, React.ReactNode>;
};

const TaskListItem = ({
  task,
  onTaskClick,
  priorityColors,
  statusIcons,
}: Props) => {
  return (
    <tr
      key={task.id}
      onClick={() => onTaskClick?.(task)}
      className="group hover:bg-white/2 transition-all cursor-pointer relative"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-neutral-500 border border-white/5 group-hover:border-brand/30 transition-colors">
            <TagIcon size={14} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white group-hover:text-brand transition-colors tracking-tight line-clamp-1">
              {task.title}
            </p>
            <p className="text-[10px] text-neutral-500 font-mono tracking-tighter uppercase flex items-center gap-2">
              <span>{task.id.slice(0, 8)}</span>
              {task.tag && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-brand/80 font-bold">{task.tag}</span>
                </>
              )}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300">
          {statusIcons[task.status] || <AlertCircle size={14} />}
          <span className="opacity-80 font-mono text-[10px]">
            {task.status.replace("_", " ")}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-widest ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex -space-x-1.5 overflow-hidden">
          {task.assignees && task.assignees.length > 0 ? (
            task.assignees.slice(0, 3).map((assignee) => (
              <div
                key={assignee.id}
                className="w-6 h-6 rounded-full border-2 border-bg-dark-0 bg-neutral-800 flex items-center justify-center text-[8px] text-white relative z-0 hover:z-10 transition-transform hover:scale-110"
                title={assignee.name}
              >
                {assignee.avatarUrl ? (
                  <Image
                    src={assignee.avatarUrl}
                    alt={assignee.name}
                    width={24}
                    height={24}
                    className="w-full rounded-full h-full object-cover"
                  />
                ) : (
                  assignee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)
                )}
              </div>
            ))
          ) : (
            <span className="text-neutral-600 text-[10px] italic">
              Unassigned
            </span>
          )}
          {task.assignees.length > 3 && (
            <div className="w-6 h-6 rounded-full border-2 border-bg-dark-0 bg-neutral-800 flex items-center justify-center text-[8px] text-white relative z-0 hover:z-10 transition-transform hover:scale-110">
              +{task.assignees.length - 3}
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {/* Mock subtasks UI or hide */}
          <span className="text-[10px] text-neutral-500 font-semibold italic">
            {task.categoryId || "--"}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-neutral-400 font-mono text-[10px]">
          <Clock size={12} />
          {task.deadline
            ? new Date(task.deadline).toLocaleDateString([], {
                month: "short",
                day: "numeric",
              })
            : "--"}
        </div>
      </td>
    </tr>
  );
};

export default TaskListItem;
