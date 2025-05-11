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



const Route = createBrowserRouter([
    
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <Error/>,
        children:[
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: '/queries',
                element: <Queries/>,
            },
            {
                path: '/recommendations-for-me/:email',
                element: <PrivetRoute><RecommendationsForMe/></PrivetRoute>,
            },
            {
                path: '/my-queries',
                element: <PrivetRoute><MyQueries/></PrivetRoute>
            },
            {
                path: '/my-recommendations/:email',
                element: <PrivetRoute><MyRecommendations/></PrivetRoute>,
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
            },
            {
                path: '/update/:id',
                element: <PrivetRoute><UpdateQueries/></PrivetRoute>,
            }
        ]
    }
])

export default Route;