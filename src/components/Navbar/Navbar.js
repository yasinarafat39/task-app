import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const Navbar = () => {

    const { user } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const menus = [
        {
            id: 1,
            to: "addtask",
            item: "Add Task"
        },
        {
            id: 2,
            to: "mytask",
            item: "My Task"
        },
        {
            id: 3,
            to: "completedtask",
            item: "Completed Task"
        },
        {
            id: 4,
            to: "media",
            item: "Media"
        },
    ]


    return (
        <div className=" px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
            <div className="relative flex items-center justify-between">
                <Link
                    to="/"
                    aria-label="Task-App"
                    title="Task App"
                    className="inline-flex items-center"
                >

                    <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                        Task App
                    </span>
                </Link>
                <ul className="flex items-center hidden space-x-8 lg:flex">

                    {
                        menus.map(menu => <li
                            key={menu.id}
                        >
                            <NavLink
                                to={`/${menu.to}`}
                                className={({ isActive }) => isActive ?
                                    " underline underline-offset-8 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-purple-700"
                                    :
                                    "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-purple-700"}
                            >
                                {menu.item}
                            </NavLink>
                        </li>)
                    }


                </ul>
                <ul className="flex items-center hidden space-x-8 lg:flex">
                    {
                        user?.uid ?

                            <>
                                <li>
                                    <button

                                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"

                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <Link
                                        to="/register"
                                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"

                                    >
                                        Register
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"

                                    >
                                        Login
                                    </Link>
                                </li>
                            </>
                    }
                </ul>
                <div className="lg:hidden">
                    <button
                        aria-label="Open Menu"
                        title="Open Menu"
                        className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                            />
                            <path
                                fill="currentColor"
                                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                            />
                            <path
                                fill="currentColor"
                                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                            />
                        </svg>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute top-0 left-0 w-full">
                            <div className="p-5 bg-white border rounded shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <Link
                                            to="/"
                                            aria-label="Task-App"
                                            title="Task App"
                                            className="inline-flex items-center"
                                        >
                                            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                                                Task App
                                            </span>
                                        </Link>
                                    </div>
                                    <div>
                                        <button
                                            title="Close Menu"
                                            className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <nav>
                                    <ul className="space-y-4">

                                        {
                                            menus.map(menu => <li
                                                key={menu.id}
                                            >
                                                <NavLink
                                                    to={`/${menu.to}`}
                                                    className={({ isActive }) => isActive ?
                                                        " underline underline-offset-8 font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-purple-700"
                                                        :
                                                        "font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-purple-700"}
                                                >
                                                    {menu.item}
                                                </NavLink>
                                            </li>)
                                        }


                                        {
                                            user?.uid ?

                                                <>
                                                    <li>
                                                        <button

                                                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"

                                                        >
                                                            Logout
                                                        </button>
                                                    </li>
                                                </>
                                                :
                                                <>
                                                    <li>
                                                        <Link
                                                            to="/register"
                                                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"

                                                        >
                                                            Register
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link
                                                            to="/login"
                                                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"

                                                        >
                                                            Login
                                                        </Link>
                                                    </li>
                                                </>
                                        }


                                    </ul>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Navbar;