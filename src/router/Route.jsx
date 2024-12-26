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
import ViewDetails from "../pages/ViewDetails";
import PrivetRoute from "./PriverRoute";
import UpdateQueries from "../pages/UpdateQueries";
import Error from "../pages/Error";
import axiosInstance from "../axiosInstance";


const recommendationsLoader = async ({ params }) => {
    return await axiosInstance.get(`/recommendations-for-me/${params.email}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error loading recommendations:", error);
            throw new Response("Failed to load data", { status: error.response?.status || 500 });
        });
};

const myRecommendation = async ({ params }) => {
    return await axiosInstance.get(`/my-recommendation/${params.email}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error loading recommendations:", error);
            throw new Response("Failed to load data", { status: error.response?.status || 500 });
        });
};

const details = async ({ params }) => {
    return await axiosInstance.get(`/details/${params.id}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error loading recommendations:", error);
            throw new Response("Failed to load data", { status: error.response?.status || 500 });
        });
};



const Route = createBrowserRouter([
    
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <Error/>,
        children:[
            {
                path: '/',
                element: <Home/>,
                loader: () => fetch('http://localhost:5000/recent-queries')
            },
            {
                path: '/queries',
                element: <Queries/>,
                loader: () => fetch('http://localhost:5000/all-queries')
            },
            {
                path: '/recommendations-for-me/:email',
                element: <PrivetRoute><RecommendationsForMe/></PrivetRoute>,
                loader: recommendationsLoader
            },
            {
                path: '/my-queries',
                element: <PrivetRoute><MyQueries/></PrivetRoute>
            },
            {
                path: '/my-recommendations/:email',
                element: <PrivetRoute><MyRecommendations/></PrivetRoute>,
                loader: myRecommendation,
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
                element: <PrivetRoute><AddQueries/></PrivetRoute>
            },
            {
                path: '/details/:id',
                element: <PrivetRoute><ViewDetails/></PrivetRoute>,
                loader: details,
            },
            {
                path: '/update/:id',
                element: <PrivetRoute><UpdateQueries/></PrivetRoute>,
                loader: details,
            }
        ]
    }
])

export default Route;