import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import Loading from '../Loading/Loading';

import { FaTrashAlt, FaEdit, FaCheckCircle } from "react-icons/fa";
import { toast } from 'react-hot-toast';



const MyTask = () => {

    const { user } = useContext(AuthContext);

    const { data: myAllTask = [], isLoading, refetch } = useQuery({
        queryKey: ['AllTask'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/alltask?email=${user?.email}`)
            const data = await res.json();
            return (data);
        }
    })

    if (isLoading) {
        <Loading></Loading>
    }



    const handleCompleteTask = _id => {

        fetch(`http://localhost:5000/alltask/complete/${_id}`, {
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
            fetch(`http://localhost:5000/alltask/${_id}`, {
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
                myAllTask &&
                myAllTask.map(task => <div

                    key={task._id}

                >

                    {
                        myAllTask.length ?
                            <>
                                <div
                                    className="w-full  max-w-lg mx-auto mt-12 shadow-lg p-4 pb-2 space-y-2 rounded-xl  bg-gray-300 text-gray-800"
                                >
                                    <div className=''>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-xl font-semibold'>{task.task}</span>

                                            <div>
                                                <button className='mr-4 '> <FaEdit /> </button>
                                                <button
                                                    onClick={() => handleDeleteTask(task._id)}
                                                    className=' '> <FaTrashAlt /> </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center self-stretch justify-end">
                                            <button onClick={() => handleCompleteTask(task._id)}
                                                className={`${task?.status === 'incomplete' ? 'py-1 px-2 bg-gray-400 hover:bg-gray-200 transition rounded' : 'py-1 px-2 bg-purple-400 rounded '}`}>
                                                {task?.status === 'complete' ? <div className='flex items-center'>
                                                    completed <FaCheckCircle className='ml-2' />
                                                </div>
                                                    :
                                                    <>
                                                        add to complete
                                                    </>

                                                }
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
                                    Empty Orders
                                </h2>
                            </>
                    }

                </div>)
            }

        </div>
    );
};

export default MyTask;