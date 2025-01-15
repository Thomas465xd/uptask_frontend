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

/** Auth & Users */
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(), 
    password: z.string(),
    confirmPassword: z.string(),
    token: z.string(),
})

export const userSchema = z.object({
    _id: z.string(),
    email: z.string().email(),
    name: z.string(),
})

/** Team */

const teamMemberSchema = userSchema.pick({
    name: true, 
    email: true, 
    _id: true
})

// Project Types

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, "projectName" | "projectDescription" | "clientName">;

// Task Types

export type Task = z.infer<typeof taskSchema>;
export type TaskV2 = z.infer<typeof taskSchemaV2>;
export type TaskFormData = Pick<Task, "taskName" | "taskDescription">;
export type TaskStatus = z.infer<typeof taskStatusSchema>;

// Auth & Users Types

export type Auth = z.infer<typeof authSchema>;
export type ConfirmToken = Pick<Auth, "token">
export type RequestConfirmationCodeForm = Pick<Auth, "email">
export type ForgotPasswordForm = Pick<Auth, "email">
export type NewPasswordForm = Pick<Auth, "password" | "confirmPassword">

export type UserLoginForm = Pick<Auth, "email" | "password">
export type UserRegistrationForm = Pick<Auth, "name" | "email" | "password" | "confirmPassword">
export type User = z.infer<typeof userSchema>;

// Team Types

export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberFormData = Pick<TeamMember, "email">;