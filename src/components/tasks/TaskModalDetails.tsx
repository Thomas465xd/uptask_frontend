import { ChangeEvent, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateTaskStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate } from '@/utilities/utilities';
import { statusTranslations } from '@/locales/en';
import { TaskStatus } from '@/types/index';


export default function TaskModalDetails() {

    const navigate = useNavigate();

    const params = useParams();
    const projectId = params.projectId!;

    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("viewTask")!;

    const show = taskId ? true : false

    const { data, isError, error } = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTaskById({projectId, taskId: taskId}),
        enabled: !!taskId, // Only run the query if taskId is truthy (true if it exists in the URL)
        retry: false
    })

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateTaskStatus, 
        onError: (error) => {
            const errorMessage = error.message || "An error occurred";
            toast.error(errorMessage);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["editProject", projectId]});
            queryClient.invalidateQueries({queryKey: ["task", taskId]});
            toast.success(data.message);
        }
    });

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        //console.log(e.target.value)

        const status = e.target.value as TaskStatus
        const data = { projectId, taskId, status };

        mutate(data);
    }

    if(isError) {
        const errorMessage = error.message || "Task Not Found";
        toast.error(errorMessage, {toastId: "error"});
        return <Navigate to={`/projects/${projectId}`} />
    }

    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => {navigate(location.pathname, {replace: true})}}>
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
                                    <p className='text-sm text-slate-400'>Added in: <span>{formatDate(data.createdAt)}</span> </p>
                                    <p className='text-sm text-slate-400 border-b'>Last Update: <span>{formatDate(data.updatedAt)}</span> </p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >
                                        Task Name: {data.taskName}
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'><span className='text-slate-600 font-semibold'>Task Description:</span> {data.taskDescription}</p>

                                    {data.completedBy && (
                                        <p className='text-lg text-slate-500 mb-2'>
                                            Status Updated by: <span className="font-bold-text-slate-600">{data.completedBy.name} </span>
                                        </p>
                                    )}

                                    <div className='my-5 space-y-3 mt-10'>
                                        <label className='font-bold text-fuchsia-600'>
                                            Current Status: 

                                            <select 
                                                className='w-full p-3 bg-white border-gray-300 text-black rounded border'
                                                defaultValue={data.status}
                                                onChange={handleChange}
                                            >
                                                {Object.entries(statusTranslations).map(([key, value]) => (
                                                    <option key={key} value={value}>{value}</option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}