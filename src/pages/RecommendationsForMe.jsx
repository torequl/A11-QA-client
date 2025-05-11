import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const RecommendationsForMe = () => {

    const [data , setData] = useState([])
    const axiosConfig = useAxiosSecure();
    const {email} = useParams()

    useEffect( ()=> {
        axiosConfig.get(`/recommendations-for-me/${email}`)
        .then(res => setData(res.data))
    },[axiosConfig, email])


    return (
        <div>
            <div className="overflow-x-auto max-w-6xl mx-auto">
                {
                    data.length > 0 ?
                    <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-blue-100">
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Product Name</th>
                            <th>Reason</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map((item, i) =>
                                <tr key={item._id}>
                                    <td>{i + 1}</td>
                                    <td>{item.recommendationUserName}</td>
                                    <td>{item.recommendationEmail}</td>
                                    <td>{item.recommendedProductName}</td>
                                    <td>{item.recommendationReason}</td>
                                    <td>{item.currentDate}</td>
                                </tr>)
                        }

                    </tbody>
                </table> 
                :
                <h2 className="text-2xl text-red-500 text-center">You Do not have any Recommendations </h2>
                }
            </div>
        </div>
    );
};

export default RecommendationsForMe;