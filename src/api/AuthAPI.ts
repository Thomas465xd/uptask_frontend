import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { ConfirmToken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, User, UserLoginForm, UserRegistrationForm, userSchema } from "../types";


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
        localStorage.setItem("UPTASK_AUTH_TOKEN", data.token);

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

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = `/auth/forgot-password`;
        const { data } = await api.post(url, formData );

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export async function validatePasswordToken(formData: ConfirmToken) {
    try {
        const url = `/auth/validate-token`;
        const { data } = await api.post(url, formData );

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export async function resetPasswordWithToken({formData, token}: {formData: NewPasswordForm, token: ConfirmToken["token"]}) {
    try {
        const url = `/auth/reset-password/${token}`;
        const { data } = await api.post(url, formData );

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
    }
}

export async function getUser() {
    try {
        const url = `/auth/user`;
        const { data } = await api.get<User>(url);;

        const response = userSchema.safeParse(data);
        if(response.success) {
            //console.log(response.data)
            return response.data;
        }

        console.error("Schema validation failed:", response.error);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}