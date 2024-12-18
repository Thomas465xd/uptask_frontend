import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";

export default function NewPasswordView() {
    const [token, setToken] = useState<ConfirmToken["token"]>('');
    const [isValidToken, setIsValidToken] = useState<boolean>(false);

    return (
        <>
            <h1 className="text-5xl font-black text-white">Reset Password</h1>
            <p className="text-2xl font-light text-white mt-5 mb-5">
                {!isValidToken ? (
                    <>
                        Insert the 6-digit code 
                        <span className="text-fuchsia-500 font-bold"> from your email </span>
                    </>
                ) : (
                    <>
                        Insert your new password in {''}
                        <span className="text-fuchsia-500 font-bold">the form bellow</span>
                    </>
                )}
            </p>

            {!isValidToken ? (
                <NewPasswordToken
                    token={token}
                    setToken={setToken}
                    setIsValidToken={setIsValidToken}
                />
            ) : (
                <NewPasswordForm
                    token={token}
                />
            )}
        </>
    );
}
