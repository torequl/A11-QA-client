
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
const PrivetRoute = ({ children }) => {

    const { user, loading } = useAuth()

    const location = useLocation();

    if (loading) {
        return <h1>Loading........</h1>
    }

    if (user) {
        return children;
    }

    return (
        <Navigate
        state={location.pathname}
        to={'/login'}>
        </Navigate>
    );
};

export default PrivetRoute;