import { dashboardProjectSchema, editProjectSchema, Project, ProjectFormData } from "@/types/index";
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
        const response = editProjectSchema.safeParse(data);

        if(response.success) {
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

// Get full project info by its id

/*
export async function getFullProjectById(id: Project["_id"]) {
    try {
        console.log("Fetching project with ID:", id); // Verifica si el ID es correcto

        const { data } = await api.get(`/projects/${id}`);
        console.log("Raw API Response:", data); // Muestra la respuesta sin procesar

        const response = projectSchemaV2.safeParse(data);
        console.log("Validation Result:", response); // Muestra si la validación fue exitosa

        if (response.success) {
            console.log("Validated Data:", response.data); // Muestra los datos finales
            return response.data;
        } else {
            console.error("Validation Errors:", response.error); // Muestra errores de validación
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            console.error("API Error Response:", error.response.data); // Muestra el error de la API
            throw new Error(error.response.data.error);
        } else {
            console.error("Unexpected Error:", error); // Muestra cualquier otro error inesperado
            throw new Error("An unexpected error occurred");
        }
    }
}
*/

// get full project by id
export async function getFullProjectById(id : Project["_id"]) {
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

