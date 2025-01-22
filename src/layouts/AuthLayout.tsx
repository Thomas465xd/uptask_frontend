import Logo from "@/components/Logo"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export default function AuthLayout() {
    return (
        <>
            <div className="bg-gray-800 min-h-screen flex items-center justify-center px-6">
                <div className="py-10 lg:py-20 mx-auto w-full max-w-md">
                    {/* Responsive Logo */}
                    <div className="flex justify-center">
                        <Logo />
                    </div>

                    <div className="mt-6 sm:mt-10">
                        <Outlet />
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={4000}
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            /> 
        </>
    )
}

