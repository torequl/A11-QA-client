import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const MyRecommendations = () => {
    const loadedData = useLoaderData();
    const [items, setItems] = useState(loadedData)

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
                axios.delete(`https://qa-server-tau.vercel.app/my-recommendation-delete/${id}`)
                    .then(res => console.clear(res.data))
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
        </div>
    );
};

export default MyRecommendations;