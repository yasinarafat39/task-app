import { createBrowserRouter } from "react-router-dom";
import AddTask from "../../components/AddTask/AddTask";
import CompletedTask from "../../components/CompletedTask/CompletedTask";
import Details from "../../components/Details/Details";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import Home from "../../components/Home/Home";
import Login from "../../components/Login/Login";
import Media from "../../components/Media/Media";
import MyTask from "../../components/MyTask/MyTask";
import Register from "../../components/Register/Register";
import Main from "../../Layout/Main/Main";
import PrivateRoute from "../PrivateRoute/PrivateRoute";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/addtask',
                element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
            },
            {
                path: '/mytask',
                element: <PrivateRoute><MyTask></MyTask></PrivateRoute>
            },
            {
                path: '/completedtask',
                element: <CompletedTask></CompletedTask>
            },
            {
                path: '/media',
                element: <Media></Media>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/details',
                element: <PrivateRoute><Details></Details></PrivateRoute>
            }
        ]
    }
])