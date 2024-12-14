import { Task } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/en";

type TaskListProps = {
    tasks: Task[];
};

type GroupedTasks = {
    [key: string]: Task[];
};

/*
const initialStatusGroups: GroupedTasks = {
    PENDING: [],
    ON_HOLD: [],
    IN_PROGRESS: [],
    UNDER_REVIEW: [],
    COMPLETED: [],
};
*/


const statusStyles: { [key: string]: string } = {
    PENDING: "border-t-slate-500",
    ON_HOLD: "border-t-red-500",
    IN_PROGRESS: "border-t-yellow-300",
    UNDER_REVIEW: "border-t-blue-500",
    COMPLETED: "border-t-green-400",
}

const dbToGroupStatus: Record<string, keyof GroupedTasks> = {
    "Not Started": "PENDING",
    "On Hold": "ON_HOLD",
    "In Progress": "IN_PROGRESS",
    "Under Review": "UNDER_REVIEW",
    "Completed": "COMPLETED",
};


const taskStatusOrder = ["PENDING", "ON_HOLD", "IN_PROGRESS", "UNDER_REVIEW", "COMPLETED"];

export default function TaskList({ tasks }: TaskListProps) {
    const groupedTasks = tasks.reduce<GroupedTasks>(
        (acc, task) => {
            const groupKey = dbToGroupStatus[task.status] || "PENDING"; // Map DB status to frontend key
            if (!acc[groupKey]) acc[groupKey] = []; // Ensure the group array exists
            acc[groupKey].push(task); // Add task to the group
            return acc; // Return the updated accumulator
        },
        {
            PENDING: [],
            ON_HOLD: [],
            IN_PROGRESS: [],
            UNDER_REVIEW: [],
            COMPLETED: [],
        }
    );

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tasks</h2>

            <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-20">
                {taskStatusOrder.map((status) => (
                    <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">

                        <h3 className={`capitalize font-bold border border-slate-300 p-3 border-t-8 bg-white rounded-lg ${statusStyles[status]}`}>{statusTranslations[status]}</h3>

                        <ul className="mt-5 space-y-5">
                            {groupedTasks[status].length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">No tasks found</li>
                            ) : (
                                groupedTasks[status].map((task) => (
                                    <TaskCard key={task._id} task={task} />
                                ))
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}
