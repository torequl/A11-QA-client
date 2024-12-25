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
        <section className="mx-auto px-4 max-w-screen-xl md:px-8">
            <section className="py-20" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.17) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}>
                <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
                    <div className="max-w-xl space-y-3 md:mx-auto">
                        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Your Queries
                        </p>
                        <p className="text-gray-600">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.
                        </p>
                    </div>
                    <div className="mt-4">
                        <Link to='/add-queries' className="inline-block py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none">
                            Add Queries
                        </Link>
                    </div>
                </div>
            </section>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {myQueries.length > 0 || <h2 className="text-2xl text-red-500 text-center py-10">No Data Found</h2>}
                {
                    myQueries.map((item, i) => (
                        <article className="mx-auto mt-10 w-full rounded-md" key={i}>
                            <div className="mx-auto bg-white border rounded-lg">
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
                                    <div className="mt-5 gap-2 flex justify-between">
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