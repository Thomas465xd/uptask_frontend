import { z } from "zod";

/** Projects */
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    projectDescription: z.string(),
    clientName: z.string(),
})

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        projectDescription: true,
        clientName: true
    })
)

/** Tasks */
export const taskStatusSchema = z.enum(["PENDING", "COMPLETED", "IN_PROGRESS", "CANCELLED"])

export const taskSchema = z.object({
    _id: z.string(),
    taskName: z.string(),
    taskDescription: z.string(),
    project: z.string(),
    status: taskStatusSchema,
})

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, "projectName" | "projectDescription" | "clientName">;
export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "taskName" | "taskDescription">;