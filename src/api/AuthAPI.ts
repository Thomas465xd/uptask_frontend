import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm } from "../types";


export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = `/auth/create-account`;
        const { data } = await api.post(url, formData);

        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export async function confirmAccount(token: ConfirmToken["token"]) {
    try {
        const url = `/auth/confirm-account`;
        const { data } = await api.post(url, { token });

        return data; 
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export async function login(formData: UserLoginForm) {
    try {
        const url = `/auth/login`;
        const { data } = await api.post(url, formData);

        return data ;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try {
        const url = `/auth/request-code`;
        const { data } = await api.post(url, formData );

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}