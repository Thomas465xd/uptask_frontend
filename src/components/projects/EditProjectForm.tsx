import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { Project, ProjectFormData } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateProject } from "@/api/ProjectAPI";

type EditProjectFormProps = {
    data: ProjectFormData
    projectId: Project["_id"]
}

export default function EditProjectForm({data, projectId} : EditProjectFormProps) {

    //console.table(data)

    const navigate = useNavigate();

    // Autocomplete edit form data
    const { register, handleSubmit, formState: { errors }} = useForm({defaultValues: {
        projectName: data.projectName, 
        projectDescription: data.projectDescription, 
        clientName: data.clientName,
    }});

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateProject, 
        onError: (error) => {
            toast.error(error.message);

        },
        onSuccess: (data) => {
            // "deletes" the project from the cache
            queryClient.invalidateQueries({queryKey: ["projects"]});
            queryClient.invalidateQueries({queryKey: ["editProject", projectId]});

            toast.success(data.message);
            navigate("/")
        }
    })

    const handleFormSubmit = (formData: ProjectFormData) => {
        const data = {
            formData, 
            projectId
        }
        mutate(data);
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Edit Project</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Complete the following form to update an existing project</p>

                <nav className="my-5">
                    <Link to="/" className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white rounded-lg font-bold mt-10 inline-block transition-colors">
                        Go Back to Projects
                    </Link>
                </nav>

                <form 
                    action=""
                    className="mt-10 bg-white shadow-lg rounded-lg p-10" 
                    onSubmit={handleSubmit(handleFormSubmit)}
                    noValidate
                >

                <ProjectForm
                    register={register}
                    errors={errors}
                />

                <input 
                    type="submit"
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full px-10 py-3 text-white rounded-lg font-bold mt-10 inline-block transition-colors"
                    value={"Edit Project"}
                />
                </form>
            </div>
        </>
    )
}
