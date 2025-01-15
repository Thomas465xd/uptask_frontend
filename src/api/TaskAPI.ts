import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Project, Task, TaskFormData, taskSchemaV2 } from "../types";

type TaskAPIType = {
    formData: TaskFormData,
    projectId: Project["_id"], 
    taskId: Task["_id"], 
    status: Task["status"]
}

export async function getTaskById({projectId, taskId} : Pick<TaskAPIType, "projectId" | "taskId">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.get(url);
        //console.log(data)
        const response = taskSchemaV2.safeParse(data);

        //console.log(response)

        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function createTask({formData, projectId} : Pick<TaskAPIType, "formData" | "projectId">) {
    try {
        const url = `/projects/${projectId}/tasks`;
        const { data } = await api.post(url, formData);

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateTask({projectId, taskId, formData} : Pick<TaskAPIType, "projectId" | "taskId" | "formData">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.put(url, formData);

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteTask({projectId, taskId} : Pick<TaskAPIType, "projectId" | "taskId">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`;
        const { data } = await api.delete(url);

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateTaskStatus({projectId, taskId, status} : Pick<TaskAPIType, "projectId" | "taskId" | "status">) {
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/status`;
        const { data } = await api.post(url, {status});

        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}