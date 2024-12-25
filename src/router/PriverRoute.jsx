
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";

// eslint-disable-next-line react/prop-types
const PrivetRoute = ({ children }) => {

    const { user, loading } = useAuth()

    const location = useLocation();

    if (loading) {
        return <Spinner/>
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