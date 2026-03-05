import { useGetTasksQuery } from "@/features/task/task.api";
import { Task, TaskStatus } from "@/features/task/task.interface";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

type Props = {
  projectId: string;
  status: TaskStatus;
  limit?: number;
  columnColor: string;
  columnTitle: string;
  onTaskClick: (task: Task) => void;
  onAddTask: (status: TaskStatus) => void;
};

const TaskBoardContainer = ({
  projectId,
  status,
  limit,
  columnColor,
  columnTitle,
  onTaskClick,
  onAddTask,
}: Props) => {
  const [page, setPage] = useState<number>(1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalTasks, setTotalTasks] = useState<number>(0);

  const { data, isLoading } = useGetTasksQuery(
    {
      projectId,
      query: {
        page,
        limit,
        status,
        sortBy: "updatedAt",
        sortOrder: "desc",
      },
    },
    {
      skip: !projectId,
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (data?.tasks) {
      setTasks(data.tasks);
    }
    if (data?.pagination.totalPages) {
      setTotalPages(data.pagination.totalPages);
    }
    if (data?.pagination.total) {
      setTotalTasks(data.pagination.total);
    }
  }, [data]);

  return (
    <div className="flex-1 min-w-[280px] flex flex-col gap-4">
      {/* Column Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${columnColor} shadow-[0_0_8px] shadow-current`}
          />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {columnTitle}
          </h3>
          <span className="text-xs text-neutral-500 font-mono bg-white/5 px-2 py-0.5 rounded-full">
            {totalTasks}
          </span>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="text-neutral-600 hover:text-white transition-all hover:rotate-90 p-1"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Task List */}
      <div className="flex-1 bg-white/2 rounded-2xl p-2 border border-white/5 space-y-3 min-h-[150px] overflow-y-auto max-h-[calc(100vh-250px)] scrollbar-thin scrollbar-thumb-white/10">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={onTaskClick} />
        ))}

        <button
          onClick={() => onAddTask(status)}
          className="w-full py-3 flex items-center justify-center gap-2 text-sm text-neutral-500 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-dashed border-white/5 hover:border-white/20 group"
        >
          <Plus
            size={16}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="font-medium">Add Task</span>
        </button>
      </div>
    </div>
  );
};

export default TaskBoardContainer;
