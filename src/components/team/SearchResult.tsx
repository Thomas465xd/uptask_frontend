import { addUserToProject } from "@/api/TeamAPI"
import { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps = {
    user: TeamMember
    reset: () => void
}

export default function SearchResult({ user, reset } : SearchResultProps) {

    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()
    
    const { mutate } = useMutation({
        mutationFn: addUserToProject, 
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            toast.success(data.message)
            reset()
            queryClient.invalidateQueries({queryKey: ["projectTeam", projectId]})
        }
    })

    const handleAddUserToProject = () => {
        const data = {
            projectId, 
            id: user._id
        }

        mutate(data);
    }

    return (
        <>
            <div className="flex justify-between items-center mt-10 mb-10 border rounded-full p-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://www.gravatar.com/avatar/?d=mp"
                            alt="user"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="font-bold text-lg">{user.name}</p>
                            <p className="text-gray-500">{user.email}</p>
                        </div>
                    </div>
                </div>
                <button
                    className="text-purple-600 bg-purple-100 hover:bg-purple-300 px-10 py-3 font-bold rounded-full transition-colors cursor-pointer"
                    onClick={handleAddUserToProject}
                >
                    Add
                </button>
            </div>
        </>
    )
}
