import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient  } from "@tanstack/react-query";
import { deleteProject, getProjects } from "@/api/ProjectAPI";
import { projectSchema } from "../types";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/Loader";
import { isManager } from "@/utilities/policies";

export default function DashboardView() {

    const { data: user, isLoading: userIsLoading } = useAuth();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["projects"],
        queryFn: getProjects,
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteProject,
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            // "deletes" the project from the cache
            queryClient.invalidateQueries({queryKey: ["projects"]});

            toast.info(data.message)
        }
    })

    //console.log(data) 
    //console.log(user)

    if(isLoading && userIsLoading) return <Loader />

    if(isError) {

    }

    if(data && user) return (
        <>
            <h1 className="text-5xl font-black">My Projects</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Manage and keep track of your projects</p>

            {data.length ? (
                <>
                    <nav className="my-5">
                        <Link to="/projects/create" className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white rounded-lg font-bold mt-10 inline-block transition-colors">
                            New Project
                        </Link>
                    </nav>
                    <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                        {data.map((project) => (
                            <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto space-y-2">
                                        <div>
                                            { isManager(project.manager, user._id) ?
                                                <p className="font-bold text-xs uppercase bg-orange-50 text-orange-500 border-2 border-orange-500 rounded-lg inline-block py-1 px-5 mb-2">Manager</p> :
                                                <p className="font-bold text-xs uppercase bg-indigo-50 text-indigo-500 border-2 border-indigo-500 rounded-lg inline-block py-1 px-5 mb-2">Colaborator</p>
                                            }
                                        </div>
                                        <Link to={`projects/${project._id}`}
                                            className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                                        >{project.projectName}</Link>
                                        <p className="text-sm text-gray-400">
                                            Client: {project.clientName}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {project.projectDescription}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-x-6">
                                    <Menu as="div" className="relative flex-none">
                                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                            <span className="sr-only">options</span>
                                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                        </Menu.Button>
                                        <Transition as={Fragment} enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95">
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                                            >
                                                <Menu.Item>
                                                    <Link to={`/projects/${project._id}`}
                                                        className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                    See Project
                                                    </Link>
                                                </Menu.Item>
                                                {isManager(project.manager, user._id) && (
                                                    <>
                                                        <Menu.Item>
                                                            <Link to={`/projects/${project._id}/edit`}
                                                                className='block px-3 py-1 text-sm leading-6 text-gray-900'>
                                                            Edit Project
                                                            </Link>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <button 
                                                                type='button' 
                                                                className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                                onClick={() => mutate(project._id) }
                                                            >
                                                                Delete Project
                                                            </button>
                                                        </Menu.Item>
                                                    </>
                                                ) }
                                                    
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <div className="text-center">
                    <p className="text-center pt-20 pb-3 border-b-2">No projects yet {''}</p>
                    <Link
                        to="/projects/create"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 mb-10 text-white rounded-lg font-bold mt-10 inline-block transition-colors"
                    >Create One
                    
                    </Link>
                </div>
            )}

        </>
    )
}
