import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDate } from "@/utilities/utilities"
import Loader from "../Loader"
import { useMemo } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "@/api/NoteAPI"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

type NotesDetailProps = {
    note: Note
}

export default function NoteDetail({ note } : NotesDetailProps) {

    const { data, isLoading } = useAuth()
    const canDelete = useMemo(() => data?._id === note.createdBy._id, [data])

    const params = useParams()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)

    const projectId = params.projectId!
    const taskId = queryParams.get("viewTask")!

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteNote, 
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            toast.success(data.message),
            queryClient.invalidateQueries({queryKey: ["task", taskId]})
        }
    })

    if(isLoading) return <Loader />
    
    return (
        <div className="p-3 flex justify-between items-center">
            <div className="">
                <p className="font-bold">
                    Note by <span className="text-purple-800 underline">{note.createdBy.name}</span>: <span className="font-normal">{note.content}</span> 
                </p>

                <p className="text-xs text-slate-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>

            {canDelete && (
                <button
                    type="button"
                    className="bg-red-400 rounded hover:bg-red-500 p-2 text-xs text-white font-bold transition-colors"
                    onClick={() => mutate({projectId, taskId, noteId: note._id})}
                >
                    Delete
                </button>
            )}
        </div>
    )
}
