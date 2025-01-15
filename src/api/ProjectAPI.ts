import { dashboardProjectSchema, Project, ProjectFormData } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

/**
 * Crea un nuevo proyecto utilizando la API.
 * @param formData - Los datos del formulario del proyecto.
 * @returns La respuesta de la API con los datos del proyecto creado.
 * @throws Error con un mensaje proveniente de la API o un mensaje genérico.
 */

// get all projects
export async function getProjects() {
    //const token = localStorage.getItem("UPTASK_AUTH_TOKEN");
    try {
        /*
        const { data } = await api.get("/projects", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        */
        const { data } = await api.get("/projects");
        const response = dashboardProjectSchema.safeParse(data); 

        if(response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

// get project by id
export async function getProjectById(id : Project["_id"]) {
    try {
        const { data } = await api.get(`/projects/${id}`);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

// create project
export async function createProject(formData: ProjectFormData): Promise<any> {
    try {
        const { data } = await api.post("/projects", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

type ProjectAPIType = {
    formData: ProjectFormData,
    projectId: Project["_id"]
}

// update project

export async function updateProject({formData, projectId} : ProjectAPIType) {
    try {
        const { data } = await api.put(`/projects/${projectId}`, formData);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

// delete project
export async function deleteProject(id : Project["_id"]) {
    try {
        const { data } = await api.delete(`/projects/${id}`);
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

