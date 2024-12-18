import type { ConfirmToken, NewPasswordForm } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordWithToken } from "@/api/AuthAPI";
import { toast } from "react-toastify";

type NewPasswordFormProps = {
    token: ConfirmToken["token"]
}

export default function NewPasswordForm({token} : NewPasswordFormProps) {
    const navigate = useNavigate()

    const initialValues: NewPasswordForm = {
        password: '',
        confirmPassword: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: resetPasswordWithToken, 
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            toast.success(data.message);
            reset();
            navigate('/auth/login');
        }
    })

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData,
            token
        }
        mutate(data);
    }

    const password = watch('password');

    return (
        <>
            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-8 p-10  bg-white mt-10 rounded"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="New Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Repeat Password</label>

                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Repeat the New Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("confirmPassword", {
                            required: "Repeat Password is required",
                            validate: value => value === password || 'Passwords do not match'
                        })}
                    />

                    {errors.confirmPassword && (
                        <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Update Password'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
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