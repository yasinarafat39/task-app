import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import Main from "../../Layout/Main/Main";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            
        ]
    }
])