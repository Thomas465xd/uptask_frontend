import { NoteFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/api/NoteAPI"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

export default function AddNoteForm() {

    const params = useParams()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)

    const projectId = params.projectId!
    const taskId = queryParams.get("viewTask")!

    const initialValues : NoteFormData = {
        content: ''
    }

    const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createNote, 
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            toast.success(data.message)
            queryClient.invalidateQueries({queryKey: ["task", taskId]})
        }
    })

    const handleAddNote = (formData: NoteFormData) => {
        /*
        console.log(formData)
        console.log(projectId)
        console.log(taskId)
        */

        mutate({
            projectId, 
            taskId, 
            formData, 
        })

        reset()
    }

    return (
        <form 
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-3 border-t-2"
            noValidate
        >
            <div className="flex flex-col gap-2 mt-2">
                <label className="font-bold" htmlFor="content">Create Note</label>
                <input 
                    type="text"
                    id="content" 
                    placeholder="Note Content"
                    className="w-full p-3 border border-gray-300 rounded"
                    {...register("content", {
                        required: "Note cannot be empty"
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>

            <input 
                type="submit"
                value="Create Note"
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-black transition-colors rounded"
            />
        </form>
    )
}
