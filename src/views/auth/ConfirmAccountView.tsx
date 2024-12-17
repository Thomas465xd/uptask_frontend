import { Link } from "react-router-dom";

export default function ConfirmAccountView() {


    return (
        <>
            <h1 className="text-5xl font-black text-white">Confirm Your Account</h1>
            <p className="text-2xl font-light text-white mt-5">
                Insert thecode we sent you {''}
                <span className=" text-fuchsia-500 font-bold"> by e-mail</span>
            </p>
            <form
                className="space-y-8 p-10 bg-white mt-10 rounded"
            >
                <label
                className="font-normal text-2xl text-center block"
                >6-digit code</label>

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