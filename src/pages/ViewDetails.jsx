import { useLoaderData } from "react-router-dom";

const ViewDetails = () => {
    const loadedData = useLoaderData();
    console.log(loadedData);
    return (
        <div>
            View Details
        </div>
    );
};

export default ViewDetails;