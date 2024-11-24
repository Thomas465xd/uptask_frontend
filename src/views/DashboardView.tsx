import { Link } from "react-router-dom";

export default function DashboardView() {
    return (
        <>
            <h1 className="text-5xl font-black">My Projects</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Manage and keep track of your projects</p>

            <nav className="my-5">
                <Link to="/projects/create" className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white rounded-lg font-bold mt-10 inline-block transition-colors">
                    New Project
                </Link>
            </nav>

        </>
    )
}
