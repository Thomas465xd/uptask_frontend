import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";

export default function CreateProjectView() {

    const initialValues = {
        projectName: "", 
        projectDescription: "", 
        clientName: "",
    }
    const { register, handleSubmit, formState: { errors }} = useForm({defaultValues: initialValues});

    const handleFormSubmit = (data) => {
        console.log(data)
    }

    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Create a New Project</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Complete the following form to create a new project</p>

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
                    value={"Create Project"}
                />
                </form>
            </div>
        </>
    )
}
