import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import Loading from '../Loading/Loading';

const CompletedTask = () => {

    const { user } = useContext(AuthContext);

    const { data: completedTask = [], isLoading, refetch } = useQuery({
        queryKey: ['completed task'],
        queryFn: async () => {
            const res = await fetch(`https://task-app-server-theta.vercel.app/alltask/complete/${user?.email}`)
            const data = await res.json();
            return (data);
        }
    })

    if (isLoading) {
        <Loading></Loading>
    }


    const handleMakeIncompleteTask = _id => {

        fetch(`https://task-app-server-theta.vercel.app/alltask/incomplete/${_id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("task complete");
                    refetch();
                }
            })
    }



    const handleDeleteTask = _id => {

        const proceed = window.confirm('Are you sure? You want to delete task');

        if (proceed) {
            fetch(`https://task-app-server-theta.vercel.app/alltask/${_id}`, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(data => {

                    if (data.deletedCount === 1) {
                        toast.success('Delete Successfully');
                        refetch();
                    }
                })
        }
    }


    return (
        <div>
            <h2 className='text-center text-5xl mt-8 font-bold text-gray-500'>My Tasks</h2>

            {
                completedTask &&
                completedTask.map(task => <div

                    key={task._id}

                >

                    {
                        completedTask.length ?
                            <>
                                <div
                                    className="w-full  max-w-lg mx-auto mt-12 shadow-lg p-4 pb-2 space-y-2 rounded-xl  bg-gray-300 text-gray-800"
                                >
                                    <div className=''>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-xl font-semibold'>{task.task}</span>

                                            <div>
                                                <button
                                                    onClick={() => handleDeleteTask(task._id)}
                                                    className=' '>
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center self-stretch justify-end">
                                            <button
                                                onClick={() => handleMakeIncompleteTask(task._id)}
                                                className="py-1 px-2 bg-gray-400 hover:bg-gray-200 transition rounded"
                                            >
                                                not complete
                                            </button>
                                        </div>
                                    </div>

                                    <div>

                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <h2 className='text-2xl text-gray-500 font-bold text-center my-20'>
                                    You have no completed task
                                </h2>
                            </>
                    }

                </div>)
            }

        </div>
    );
};

export default CompletedTask;