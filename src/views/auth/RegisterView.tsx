import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {

    const initialValues: UserRegistrationForm = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const navigate = useNavigate();

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createAccount, 
        onError: (error) => {
            toast.error(error.message);
        }, 
        onSuccess: (data) => {
            toast.success(data.message);
            reset();
        }
    });

    const password = watch('password');

    const handleRegister = (formData: UserRegistrationForm) => {
        mutate(formData);
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Register</h1>
            <p className="text-2xl font-light text-white mt-5">
                Fill out the form to {''}
                <span className=" text-fuchsia-500 font-bold"> Create Your Account </span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 p-10  bg-white mt-10 rounded"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Register Email"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "Register Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid Email",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Name</label>
                    <input
                        type="name"
                        placeholder="Register Name"
                        className="w-full p-3  border-gray-300 border"
                        {...register("name", {
                        required: "The User Name is required",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Register Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                        required: "Register Password is required",
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters long'
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
                        placeholder="Repeat Registration Password"
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
                    value='Create Account'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to={"/auth/login"}
                    className="text-center text-gray-300 hover:text-gray-500 transition-colors"
                >
                    Already have an account? <span className="font-bold">Login Here</span>
                </Link>

                <Link
                    to={"/auth/reset-password"}
                    className="text-center text-gray-300 hover:text-gray-500 transition-colors"
                >
                    Forgot your password? <span className="font-bold">Recover it</span>
                </Link>
            </nav>
        </>
    )
}