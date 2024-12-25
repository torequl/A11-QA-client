import { Link } from "react-router-dom";

const RecentQueries = ({ loadedData }) => {

    return (
        <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
            <div className="text-center">
                <h1 className="text-3xl text-gray-800 font-semibold">
                    Recent Queries
                </h1>
                <p className="mt-3 text-gray-500">
                    Queries that are Asked by the community. Updated every hour.
                </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {
                    loadedData.map((item, i) => (
                        <article className="max-w-md mx-auto w-full mt-10 rounded-md" key={i}>
                            <div className="max-w-sm mx-auto bg-white border rounded-lg">
                                <img
                                    className="w-full h-48 object-contain"
                                    src={item.productImageURL}
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {item.queryTitle}
                                    </h3>
                                    <p className="text-sm text-gray-600 truncate">Brand: {item.productBrand}</p>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Query: {item.boycottingReasonDetails}
                                    </p>
                                    <Link to={`/details/${item._id}`}>
                                        <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"> View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))
                }
            </div>
        </section>
    );
};

export default RecentQueries;