import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import googleIcon from '../../assets/Google__Logo.png';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { useForm } from "react-hook-form";



const Register = () => {

    const { createUser, LoginWithGoogle, updateUser } = useContext(AuthContext);
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key
    console.log(imageHostKey);
    const navigate = useNavigate();

    // Google Login
    const handleGoogleLogin = () => {
        LoginWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => {
                toast.error(error.message)
            })
    }


    // User Register 
    const handleRegister = data => {
        console.log(data.profilePhoto[0]);


        const profilePhoto = data.profilePhoto[0];
        const formData = new FormData();
        formData.append('image', profilePhoto);

        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`

        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);

                // update user profile 
                const profile = {
                    displayName: data.name,

                }

                fetch(url, {
                    method: "POST",
                    body: formData
                })
                    .then(res => res.json())
                    .then(imgData => {
                        if (imgData.success) {
                            console.log(imgData.data.url);
                            profile.photoURL = imgData.data.url;
                            updateUser(profile)
                                .then(() => {
                                    toast.success('Register Success!');
                                    console.log(data.email);
                                    navigate('/');
                                })
                                .catch(error => {
                                    console.error(error.message);
                                })
                        }
                    })
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className="w-full max-w-md mx-auto mt-12    p-8 space-y-3 rounded-xl  bg-gray-300 text-gray-800">
            <h1 className="text-2xl font-bold text-center">Register</h1>
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-6 ng-untouched ng-pristine ng-valid">

                <div className="space-y-1 text-sm">
                    <label htmlFor="Name" className="block text-gray-600">Name</label>
                    <input {...register("name", { required: "Name is required" })} type="text" id="Name" placeholder="Name" className="w-full px-4 py-3 rounded-md border-purple-400 bg-gray-50 text-gray-800 focus:border-purple-700" />
                    {errors.name && <p className='text-red-400'>{errors.name.message}</p>}
                </div>

                <div className="space-y-1 text-sm">
                    <label htmlFor="Email" className="block text-gray-600">Email</label>
                    <input {...register("email", { required: "Email is required" })} type="email" id="Email" placeholder="Email" className="w-full px-4 py-3 rounded-md border-purple-400 bg-gray-50 text-gray-800 focus:border-purple-700" />
                    {errors.email && <p className='text-red-400'>{errors.email.message}</p>}
                </div>

                <div className="space-y-1 text-sm">
                    <label htmlFor="password" className="block text-gray-600">Password</label>
                    <input {...register("password", { required: "Password is required" })} type="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-purple-400 bg-gray-50 text-gray-800 focus:border-purple-700" />
                    {errors.password && <p className='text-red-400'>{errors.password.message}</p>}
                </div>

                <fieldset className="w-full text-gray-800">
                    <label htmlFor="files" className="block text-sm font-medium">Profile Photo</label>
                    <div className="flex">
                        <input {...register("profilePhoto", { required: "Profile photo is required" })} type="file" id="files" className=" w-full px-8 py-3 border-2 border-dashed rounded-md border-gray-300 text-gray-600 bg-gray-100" />
                    </div>
                    {errors.profilePhoto && <p className='text-red-400'>{errors.profilePhoto.message}</p>}
                </fieldset>

                <button
                    type='submit'
                    className=" inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
                >
                    Register
                </button>
            </form>
            <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 bg-gray-600"></div>
                <p className="px-3 text-sm text-gray-600">OR</p>
                <div className="flex-1 h-px sm:w-16 bg-gray-600"></div>
            </div>
            <div className="flex justify-center space-x-4">
                <button onClick={handleGoogleLogin} type="button" className=" hover:bg-[#515B60] hover:text-white transition mt-4 w-full p-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-600 focus:ring-purple-400">
                    <p className='flex items-center justify-evenly text-xl'>
                        <img src={googleIcon} width="30" height="30" alt="" />
                        Login with Google
                    </p>
                </button>
            </div>
            <p className="  text-center sm:px-6 text-gray-600">Already have an account? { }
                <Link to="/login" className="underline text-gray-800">Login</Link>
            </p>
        </div>
    );
};

export default Register;