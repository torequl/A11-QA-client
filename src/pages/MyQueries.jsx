import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import UpdateModal from "../components/UpdateModal";

const MyQueries = () => {
    const { user } = useAuth()

    const [queries, setQueries] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/my-queries', { params: { email: user?.email } })
            .then(res => setQueries(res.data))
    }, [user?.email]);

    const handelDelete = id => {
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
                axios.delete(`http://localhost:5000/my-queries-delete/${id}`)
                    .then(res => console.log(res.data))
                    .catch(err => console.log(err))
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                const newData = queries.filter(data => data._id !== id);
                setQueries(newData);
            }
        });

    }

    return (
        <section className="mt-10 mx-auto px-4 max-w-screen-xl md:px-8">
            <UpdateModal queries={queries}/>
            <div className="text-center">
                <h1 className="text-3xl text-gray-800 font-semibold">
                    Your Queries
                </h1>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {
                    queries.map((item, i) => (
                        <article className="max-w-md mx-auto mt-10 shadow-lg border rounded-md duration-300 hover:shadow-sm" key={i}>
                            <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                                <img
                                    className="w-full h-48 object-cover"
                                    src={item.productImageURL}
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                                        Product Name: EcoLife Water Bottle
                                    </h3>
                                    <p className="text-sm text-gray-600 truncate">Brand: EcoLife</p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Query: Is there a more sustainable water bottle?
                                    </p>
                                    <div className="mt-5 flex justify-between">
                                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                            Details
                                        </button>
                                        <button 
                                        onClick={
                                            () => document.getElementById('my_modal').showModal()}
                                        className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handelDelete(item._id)}
                                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))
                }
            </div>
        </section>
    );
};

export default MyQueries;