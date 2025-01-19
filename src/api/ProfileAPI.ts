import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { UpdateCurrentPasswordForm, UserProfileForm } from "../types";

// Update user profile name and email
export async function updateProfile(formData: UserProfileForm) {
    try {
        const url = `/auth/profile`;
        const { data } = await api.put(url, formData);
        //console.log(data)

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            //console.log(error)
            throw new Error(error.response.data.error);
        }
    }
}

export async function changePassword(formData: UpdateCurrentPasswordForm) {
    try {
        const url = `/auth/update-password`;
        const { data } = await api.post(url, formData);
        //console.log(data)

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            //console.log(error)
            throw new Error(error.response.data.error);
        }
    }
}

