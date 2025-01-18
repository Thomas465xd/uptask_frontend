import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";

type NoteAPIType = {
    formData: NoteFormData, 
    projectId: Project["_id"], 
    taskId: Task["_id"],
    noteId: Note["_id"],
}

export async function createNote({projectId, taskId, formData} : Pick<NoteAPIType, "projectId" | "taskId" | "formData">) {
    try {
        const url =`/projects/${projectId}/tasks/${taskId}/notes/create`
        const { data } = await api.post(url, formData) 

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export async function deleteNote({projectId, taskId, noteId} : Pick<NoteAPIType, "projectId" | "taskId" | "noteId">) {
    try {
        const url =`/projects/${projectId}/tasks/${taskId}/notes/${noteId}/delete`
        const { data } = await api.delete(url) 

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}