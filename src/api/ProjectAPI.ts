import { dashboardProjectSchema, ProjectFormData } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

/**
 * Crea un nuevo proyecto utilizando la API.
 * @param formData - Los datos del formulario del proyecto.
 * @returns La respuesta de la API con los datos del proyecto creado.
 * @throws Error con un mensaje proveniente de la API o un mensaje genérico.
 */

export async function getProjects() {
    try {
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

export async function createProject(formData: ProjectFormData): Promise<any> {
    try {
        const { data } = await api.post("/projects", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}


