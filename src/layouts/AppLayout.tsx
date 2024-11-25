import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/components/Logo'
import { NavMenu } from '@/components/NavMenu'

export default function AppLayout() {
    return (
        <>
            <header className='bg-gray-800 py-5'>
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center px-5">
                    <div className="w-64">
                        <Logo />
                    </div>

                    <div>
                        <NavMenu/>
                    </div>

                </div>

            </header>

            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet />
            </section>

            <footer className="py-5">
                <p className="text-center">
                    <span className="font-bold">UpTask</span> &copy; All rights reserved {new Date().getFullYear()}
                </p>
            </footer>

            <ToastContainer
                position="top-right"
                autoClose={4000}
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            />
        </>
    )
}
