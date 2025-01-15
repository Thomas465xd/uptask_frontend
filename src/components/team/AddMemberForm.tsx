import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberFormData } from "@/types/index";
import { findUserByEmail } from "@/api/TeamAPI";
import Loader from "../Loader";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
    const initialValues: TeamMemberFormData = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: findUserByEmail,  
    })

    const handleSearchUser = async (formData: TeamMemberFormData) => {
        const data = {
            projectId, 
            formData
        }

        mutation.mutate(data)
    }

    const resetData = () => {
        reset()
        mutation.reset()
    }

    return (
        <>

            <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(handleSearchUser)}
                noValidate
            >

                <div className="flex flex-col gap-3">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="name"
                    >User Email</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Add the email of the user you want to add"
                        className="w-full p-3  border-gray-300 border roundeds"
                        {...register("email", {
                            required: "User Email is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Invalid Email",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="">
                    {mutation.isPending && <Loader />}
                    {mutation.error && <ErrorMessage>{mutation.error.message || "An error occurred"}</ErrorMessage>}
                    {mutation.isSuccess && mutation.data && <SearchResult user={mutation.data} reset={resetData} />}
                </div>
                
                <input
                    type="submit"
                    className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white font-black  text-xl cursor-pointer transition-colors rounded"
                    value='Search User'
                />
            </form>


        </>
    )
}