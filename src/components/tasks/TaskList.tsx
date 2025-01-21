import {
    DndContext,
    DragEndEvent,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { Task, TaskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/en";
import DropTask from "./DropTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatus } from "@/api/TaskAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type TaskListProps = {
    tasks: Task[];
    canEdit: boolean;
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

export default function TaskList({ tasks, canEdit }: TaskListProps) {
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

    const params = useParams();
    const projectId = params.projectId!


    // Invalidate queries
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateTaskStatus, 
        onError: (error) => {
            const errorMessage = error.message || "An error occurred";
            toast.error(errorMessage);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["editProject", projectId]});
            //queryClient.invalidateQueries({queryKey: ["task", taskId]});
            toast.success(data.message);
        }
    });

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
                distance: 10,
            },
        });
        
    const touchSensor = useSensor(TouchSensor, {
            activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    });
    
    const sensors = useSensors(mouseSensor, touchSensor);

    const handleDragEnd = (event : DragEndEvent) => {
        //console.log(event);
        const { over, active } = event;
        
        if(over && over.id) {
            //console.log(over.id);
            //console.log(active.id);
            //console.log("Task moved to " + over.id);

            const taskId = active.id.toString();
            const newStatus = over.id;
            const status = statusTranslations[newStatus] as TaskStatus;

            mutate({
                projectId, 
                taskId, 
                status
            });

            queryClient.setQueryData(["editProject", projectId], (oldData: { tasks: Task[]}) => {
                const updatedTasks = oldData.tasks.map((task: Task) => {
                    if(task._id === taskId) {
                        return {
                            ...task, 
                            status
                        }
                    }

                    return task;
                })

                return {
                    ...oldData, 
                    tasks: updatedTasks 
                }
            })
        } else {
            //console.log("Task dropped outside of a dropzone");
        }
    }

    return (
        <>
            <h2 className="text-5xl font-black my-10">Tasks</h2>

            <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-20">
                <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                    {taskStatusOrder.map((status) => (
                        <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">

                            <h3 className={`capitalize font-bold border border-slate-300 p-3 border-t-8 bg-white rounded-lg ${statusStyles[status]}`}>{statusTranslations[status]}</h3>

                            <DropTask status={status} />

                            <ul className="mt-5 space-y-5">
                                {groupedTasks[status].length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">No tasks found</li>
                                ) : (
                                    groupedTasks[status].map((task) => (
                                        <TaskCard canEdit={canEdit} key={task._id} task={task} />
                                    ))
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </>
    );
}
