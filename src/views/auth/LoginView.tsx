import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function LoginView() {

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: login, 
        onError: (error) => {
            toast.error(error.message);
        }, 
        onSuccess: () => {
            toast.success("Iniciando Sesión...", 
                {autoClose: 1000}
            )
            setTimeout(() => {
                navigate("/")
            },1000)
        }
    })

    const handleLogin = (formData: UserLoginForm) => { 
        mutate(formData);
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Login</h1>
            <p className="text-2xl font-light text-white mt-5 mb-5">
                Start Planning your next Project {''}
                <span className=" text-fuchsia-500 font-bold">Today  </span>
            </p>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 bg-white rounded"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Register Email"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                        required: "El Email es obligatorio",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "E-mail no válido",
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
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Register Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                        required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Login'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer transition-colors"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to={"/auth/register"}
                    className="text-center text-gray-300 hover:text-gray-500 transition-colors"
                >
                    Don't have an account yet? <span className="font-bold">Sign Up</span>
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