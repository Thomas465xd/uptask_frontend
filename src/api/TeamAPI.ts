import { isAxiosError } from "axios";
import { Project, TeamMember, TeamMemberFormData, teamMembersSchema } from "../types";
import api from "@/lib/axios";

// Find and Add user by email
export async function findUserByEmail({projectId, formData} : {projectId: Project["_id"], formData: TeamMemberFormData}) {
    try {
        const url = `/projects/${projectId}/team/find`;
        const { data } = await api.post(url, formData);
        //console.log(data)

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

// Add a member to the team
export async function addUserToProject({projectId, id} : {projectId: Project["_id"], id: TeamMember["_id"]}) {
    try {
        const url = `/projects/${projectId}/team/add`;
        const { data } = await api.post(url, {id});
        //console.log(data)

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

// Get all project team members
export async function getProjectTeamMembers(projectId : Project["_id"]) {
    try {
        const url = `/projects/${projectId}/team`;
        const { data } = await api.get(url);
        //console.log(data)

        const response = teamMembersSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
        //console.log(data)

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

// Remove User from the Project
export async function removeUserFromProject({projectId, userId} : {projectId: Project["_id"], userId: TeamMember["_id"]}) {
    try {
        const url = `/projects/${projectId}/team/${userId}`;
        const { data } = await api.delete(url);
        //console.log(data)

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}