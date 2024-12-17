import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useState } from "react";
import { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
    const [token, setToken] = useState<ConfirmToken["token"]>("");

    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: confirmAccount, 
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            toast.success(data.message + " Redirecting to login...", {
                onClose: () => {
                    navigate("/auth/login");
                }
            });
        }
    })

    const handleChange = (token : ConfirmToken["token"]) => {
        setToken(token);
    }

    const handleComplete = (token : ConfirmToken["token"]) => {
        mutate(token);
    }
    
    return (
        <>
            <h1 className="text-5xl font-black text-white">Confirm Your Account</h1>
            <p className="text-2xl font-light text-white mt-5">
                Insert the code we sent you {''}
                <span className=" text-fuchsia-500 font-bold"> by e-mail</span>
            </p>
            <form
                className="space-y-8 p-10 bg-white mt-10 rounded"
            >
                <label
                    className="font-bold text-2xl text-center block border-b-gray-300 border-b-2 p-3"
                >6-digit code</label>

                <div className="flex justify-center gap-5">
                    <PinInput otp value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border text-center text-lg placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border text-center text-lg placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border text-center text-lg placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border text-center text-lg placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border text-center text-lg placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border text-center text-lg placeholder-white" />
                    </PinInput>
                </div>

            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/new-code'
                    className="text-center text-gray-300 font-normal hover:text-gray-500 transition-colors"
                >
                Send me a new code
                </Link>
            </nav>

        </>
    )
}