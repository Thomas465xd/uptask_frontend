import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";

type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="taskName"
                >Task Name</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Name of the Task"
                    className="w-full p-3  border-gray-300 border"
                    {...register("taskName", {
                        required: "Task Name is required",
                    })}
                />
                {errors.taskName && (
                    <ErrorMessage>{errors.taskName.message}</ErrorMessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >Task Description</label>
                <textarea
                    id="description"
                    placeholder="Description of the Task"
                    className="w-full p-3  border-gray-300 border"
                    {...register("taskDescription", {
                        required: "Task Description is required"
                    })}
                />
                {errors.taskDescription && (
                    <ErrorMessage>{errors.taskDescription.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}