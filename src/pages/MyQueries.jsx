import axios from "axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyQueries = () => {
    const { myQueries, setMyQueries } = useAuth()

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
                const newData = myQueries.filter(data => data._id !== id);
                setMyQueries(newData);
            }
        });

    }


    return (
        <section className="mt-10 mx-auto px-4 max-w-screen-xl md:px-8">

            <div className="text-center">
                <h1 className="text-3xl text-gray-800 font-semibold">
                    Your Queries
                </h1>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {
                    myQueries.map((item, i) => (
                        <article className="max-w-md mx-auto mt-10 rounded-md" key={i}>
                            <div className="max-w-sm mx-auto bg-white border rounded-lg">
                                <img
                                    className="w-full h-48 object-contain"
                                    src={item.productImageURL}
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                                    {item.queryTitle}
                                    </h3>
                                    <p className="text-sm text-gray-600 truncate">Brand: {item.productBrand}</p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Query: {item.boycottingReasonDetails}
                                    </p>
                                    <p className="mt-2 text-gray-800">
                                        Product Name: {item.productName}
                                    </p>
                                    <div className="mt-5 flex justify-between">
                                        <Link to={`/details/${item._id}`}>
                                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                            Details
                                        </button>
                                        </Link>
                                        <Link to={`/update/${item._id}`}>
                                        <button
                                        className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                            Update
                                        </button>
                                        </Link>
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