import { validatePasswordToken } from '@/api/AuthAPI';
import { ConfirmToken } from '@/types/index';
import { PinInput, PinInputField } from '@chakra-ui/pin-input';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

type NewPasswordTokenProps = {
    token: ConfirmToken["token"];
    setToken: Dispatch<SetStateAction<ConfirmToken["token"]>>;
    setIsValidToken: Dispatch<SetStateAction<boolean>>
}

export default function NewPasswordToken({token, setToken, setIsValidToken} : NewPasswordTokenProps) {

    const { mutate } = useMutation({
        mutationFn: validatePasswordToken, 
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            toast.success(data.message)
            setIsValidToken(true);
        }
    })

    const handleChange = (token: ConfirmToken["token"]) => {
        setToken(token);
    }
    const handleComplete = (token: ConfirmToken["token"]) => {
        //console.log(token)
        mutate({token});
    }

    return (
        <>
            <form
                className="space-y-8 p-10 rounded-lg bg-white mt-10"
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
                    to='/auth/forgot-password'
                    className="text-center text-gray-300 font-normal hover:text-gray-500 transition-colors"
                >
                    Send me a new code
                </Link>
            </nav>
        </>
    )
}