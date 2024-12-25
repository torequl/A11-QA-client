import { FaHeart } from "react-icons/fa";
import { Link, useLoaderData } from "react-router-dom";

const Queries = () => {

    const queries = useLoaderData()

    return (
        <section className="mx-auto px-4 max-w-screen-xl md:px-8">
            <section className="py-20" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.17) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}>
                <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
                    <div className="max-w-xl space-y-3 md:mx-auto">
                        <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            All Queries
                        </p>
                        <p className="text-gray-600">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.
                        </p>
                    </div>
                </div>
            </section>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {
                    queries.map((item, i) => (
                        <article className="max-w-md mx-auto w-full mt-10 rounded-md" key={i}>
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
                                        <h3 className="border flex items-center gap-2 text-red-500 text-xl py-2 px-4 rounded">
                                            {item.recommendationCount > 0 ? <><FaHeart /><span className='-mt-1'>{item.recommendationCount}</span></> : <FaHeart />}
                                        </h3>
                                        <Link to={`/details/${item._id}`}>
                                            <button
                                                className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                                Recommend
                                            </button>
                                        </Link>
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

export default Queries;