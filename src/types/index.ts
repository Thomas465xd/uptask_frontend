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
export const taskSchema = z.object({
    _id: z.string(),
    taskName: z.string(),
    taskDescription: z.string(),
    status: z.string(),
    project: z.string(),
})

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, "projectName" | "projectDescription" | "clientName">;
export type Task = z.infer<typeof taskSchema>;