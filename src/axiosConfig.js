
import axios from "axios";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export const axiosConfig = axios.create({
    baseURL: "https://qa-server-tau.vercel.app",
    withCredentials: true,
});

const useAxiosInstance = () => {
    return axiosConfig
};

export default useAxiosInstance;

// const navigate = useNavigate()

// useEffect(() => {
//     axiosConfig.interceptors.response.use( response => {
//         return response;
//     },
//     error => {
//         if(error.status === 401 || error.status === 403){
//             navigate('/login')
//         }
//         return Promise.reject(error);
//     }
// )
// }, [navigate])