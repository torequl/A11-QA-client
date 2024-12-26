import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://qa-server-tau.vercel.app",
    withCredentials: true,
});

export default axiosInstance;
