import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import googleIcon from '../../assets/Google__Logo.png';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { useForm } from "react-hook-form";



const Login = () => {

    const { LoginWithGoogle, loginUser, passwordReset } = useContext(AuthContext);
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();


    // user Login
    const handleLogin = data => {
        console.log(data);

        loginUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success("Login Success!");
                navigate('/');
            })
            .catch(error => {
                toast.error(error.message);
            })

    }


    // Google Login
    const handleGoogleLogin = () => {
        LoginWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success("Login Success!");
            })
            .catch(error => {
                toast.error(error.message)
            })
    }


    // Password Reset 
    const handlePasswordReset = () => {

        const email = getValues('email');

        passwordReset(email)
            .then(() => {
                toast.success("Password Reset Email already send to your email address.")
            })
            .catch(error => {
                toast.error(error.message);
            })
    }




    return (
        <div className="w-full max-w-md mx-auto mt-12    p-8 space-y-3 rounded-xl  bg-gray-300 text-gray-800">
            <h1 className="text-2xl font-bold text-center">Login</h1>
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6 ng-untouched ng-pristine ng-valid">

                <div className="space-y-1 text-sm">
                    <label htmlFor="Email" className="block text-gray-600">Email</label>
                    <input {...register("email", { required: "Email is required" })} type="email" id="Email" placeholder="Email" className="w-full px-4 py-3 rounded-md border-purple-400 bg-gray-50 text-gray-800 focus:border-purple-700" />
                    {errors.email && <p className='text-red-400'>{errors.email.message}</p>}
                </div>

                <div className="space-y-1 text-sm">
                    <label htmlFor="password" className="block text-gray-600">Password</label>
                    <input {...register("password", { required: "Password is required" })} type="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-purple-400 bg-gray-50 text-gray-800 focus:border-purple-700" />
                    {errors.password && <p className='text-red-400'>{errors.password.message}</p>}

                    <div className="flex justify-end text-gray-600">
                        <p onClick={handlePasswordReset} className='mt-3'>Forgot Password?</p>
                    </div>
                </div>

                <button
                    className=" inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
                >
                    Login
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
            <p className="  text-center sm:px-6 text-gray-600">Don't have an account? { }
                <Link to="/Register" className="underline text-gray-800">Register</Link>
            </p>
        </div>
    );
};

export default Login;