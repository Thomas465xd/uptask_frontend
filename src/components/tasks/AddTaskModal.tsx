import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TaskFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import { createTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

export default function AddTaskModal() {

    const navigate = useNavigate()

    // Read if modal exists
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const modalTask = queryParams.get('newTask')
    const show = modalTask ? true : false

    // Obtain projectId
    const params = useParams()
    const projectId = params.projectId!

    const initialValues : TaskFormData = {
        taskName: "",
        taskDescription: "",
    }

    const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: initialValues});

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            const errorMessage = error.message || "An error occurred";
            toast.error(errorMessage);
        },
        onSuccess: (data) => {
            // "deletes" the project from the cache
            queryClient.invalidateQueries({queryKey: ["editProject", projectId]});

            toast.success(data.message);
            reset();
            
            //navigate("/")
        }
    })

    const handleCreateTask = handleSubmit((formData : TaskFormData) => {
        const data = {
            formData, 
            projectId
        }
        mutate(data);
    })

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        New Task
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Complete the form and add  {''}
                                        <span className="text-fuchsia-600">a task</span>
                                    </p>

                                    <form className='mt-10 space-y-3' noValidate onSubmit={handleCreateTask}>

                                        <TaskForm
                                            register={register}
                                            errors={errors}
                                        />

                                        <input 
                                            type="submit"
                                            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full px-10 py-3 rounded text-white font-bold mt-10 inline-block transition-colors"
                                            value={"Add Task"}
                                        />
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}