import React, { useContext } from 'react';

import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const AddTask = () => {

    const { user } = useContext(AuthContext);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key




    const handleAddTask = (data) => {
        console.log(data.media[0]);

        const media = data.media[0];
        const formData = new FormData();
        formData.append('image', media);

        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    const imgURL = imgData.data.url;
                    saveTask(imgURL, data.task)
                }
            })

    }

    const saveTask = (imgURL, task) => {

        const totalTask = {
            imgURL,
            task,
            email: user.email,
            status: "incomplete"
        }

        fetch('https://task-app-server-theta.vercel.app/alltask', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(totalTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    toast.success("Task saved");
                    reset()
                }
            })
    }

    return (
        <div className="w-full max-w-md mx-auto mt-12 p-8 space-y-3 rounded-xl bg-gray-300 text-gray-800">
            <h1 className="text-2xl font-bold text-center mb-5">Add A TASK</h1>

            <form onSubmit={handleSubmit(handleAddTask)} className="space-y-6 ng-untouched ng-pristine ng-valid">


                <div className="space-y-1 text-sm">

                    <textarea {...register("task", { required: "task is required" })} placeholder="write your task here"
                        className="w-full px-4 py-3 rounded-md border-purple-400 bg-gray-50 text-gray-800 focus:border-purple-700"
                    >
                    </textarea>
                    {errors.email && <p className='text-red-400'>{errors.email.message}</p>}
                </div>

                <fieldset className="w-full text-gray-800">

                    <div className="flex">
                        <input {...register("media", { required: "files is required" })} type="file" className=" w-full px-8 py-3 border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100" />
                    </div>
                    {errors.media && <p className='text-red-400'>{errors.media.message}</p>}
                </fieldset>

                <button
                    className=" inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddTask;