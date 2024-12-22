import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Queries from "../pages/Queries";
import RecommendationsForMe from "../pages/RecommendationsForMe";
import MyQueries from "../pages/MyQueries";
import MyRecommendations from "../pages/MyRecommendations";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import AddQueries from "../pages/AddQueries";

const Route = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <div>404 Page Not Found</div>,
        children:[
            {
                path: '/',
                element: <Home/>,
                loader: () => fetch('http://localhost:5000/recent-queries')
            },
            {
                path: '/queries',
                element: <Queries/>
            },
            {
                path: '/recommendations-for-me',
                element: <RecommendationsForMe/>
            },
            {
                path: '/my-queries',
                element: <MyQueries/>
            },
            {
                path: '/my-recommendations',
                element: <MyRecommendations/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/sign-up',
                element: <SignUp/>
            },
            {
                path: '/add-queries',
                element: <AddQueries/>
            },
        ]
    }
])

export default Route;