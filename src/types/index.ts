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
export const taskStatusSchema = z.enum(["PENDING", "ON_HOLD", "IN_PROGRESS", "UNDER_REVIEW", "COMPLETED"]);
export const taskStatusSchemaV2 = z.enum(["Not Started", "On Hold", "In Progress", "Under Review", "Completed"]);


export const taskSchema = z.object({
    _id: z.string(),
    taskName: z.string(),
    taskDescription: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string()
})

export const taskSchemaV2 = z.object({
    _id: z.string(),
    taskName: z.string(),
    taskDescription: z.string(),
    project: z.string(),
    status: taskStatusSchemaV2,
    createdAt: z.string(),
    updatedAt: z.string()
})

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, "projectName" | "projectDescription" | "clientName">;
export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "taskName" | "taskDescription">;
export type TaskStatus = z.infer<typeof taskStatusSchema>;