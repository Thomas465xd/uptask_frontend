import { getProjectById } from "@/api/ProjectAPI"
import EditProjectForm from "@/components/projects/EditProjectForm"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useNavigate, useParams } from "react-router-dom"

export default function ProjectDetailsView() {

    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ["editProject", projectId],
        queryFn: () => getProjectById(projectId), 
        retry: false
    })

    if(isLoading) return <div>Loading...</div>
    if(isError) return <Navigate to="/404" />
    if(data) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.projectDescription}</p>

            <nav className="my-5 flex gap-3">
                <button 
                    type="button" 
                    className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-colors px-10 py-2 text-xl text-white rounded-md font-bold"   
                    onClick={() => navigate(`?newTask=true`)}
                >
                    Add Task
                </button>
            </nav>

            <AddTaskModal />
        </>
    )
}
