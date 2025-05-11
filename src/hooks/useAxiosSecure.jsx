import axios from "axios";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase.config";
import { Navigate } from "react-router-dom";


const axiosConfig = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});


export const useAxiosSecure = () => {
// const navigate = useNavigate()
    useEffect(() => {
        axiosConfig.interceptors.response.use(res => {
            return res;
        }, async error => {
            console.log(error);
            if (error.response.status === 401 || error.response.status === 403) {
                //Logout and Navigate to login
                signOut(auth)
                    .then(user => {
                        console.log(user);
                        return <Navigate to='/logout'/>
                    })
                    .catch(error => console.log(error))
            }
        })
    }, []);
    return axiosConfig;
};

export default useAxiosSecure;