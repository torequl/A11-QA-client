import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyRecommendations = () => {
    const [items, setItems] = useState([])
    const {email} = useParams()
    const axiosConfig = useAxiosSecure();

    useEffect(()=>{
        axiosConfig.get(`/my-recommendation/${email}`)
        .then(res => setItems(res.data))
    },[axiosConfig, email])


    const handelDelete = async id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosConfig.delete(`/my-recommendation-delete/${id}`)
                    .then(res => console.log(res.data))
                    .catch(err => console.log(err))
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                const newData = items.filter(data => data._id !== id);
                setItems(newData);
            }
        });
    }

    return (
        <div>
            {
                items.length > 0 ? 
                <div className="overflow-x-auto max-w-6xl mx-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-blue-100">
                            <th>No</th>
                            <th>Name</th>
                            <th>Product Name</th>
                            <th>Reason</th>
                            <th>Date</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item, i) =>
                                <tr key={item._id}>
                                    <th>{i + 1}</th>
                                    <th>{item.recommendationUserName}</th>
                                    <td>{item.recommendedProductName}</td>
                                    <td>{item.recommendationReason}</td>
                                    <td>{item.currentDate}</td>
                                    <td className="text-right">
                                        <button onClick={() => handelDelete(item._id)}
                                            className="btn btn-active btn-secondary">Delete</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            :
            <h2 className="text-center text-2xl my-10 text-red-500">No Data Found</h2>
            }
        </div>
    );
};

export default MyRecommendations;