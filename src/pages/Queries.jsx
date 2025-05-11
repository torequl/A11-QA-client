// import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdGridOn } from "react-icons/md";
import { LuGrid2X2 } from "react-icons/lu";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Fade } from "react-awesome-reveal";

const Queries = () => {
    const axiosConfig = useAxiosSecure();
    // const queries = useLoaderData()
    const [queries, setQueries] = useState([])

    const [active, setActive] = useState(true)

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axiosConfig.get('/all-queries')
            .then(res => setQueries(res.data))
    }, [axiosConfig])

    const filteredQueries = queries.filter((product) => {
        return product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    }
    );

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        // setQueries(filteredQueries)
    };


    return (
        <section className="mx-auto px-4 max-w-screen-xl">
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

            <div className="mx-auto flex items-center flex-col md:flex-row gap-4 justify-between mt-12">
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 right-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        value={searchTerm}
                        onChange={handleSearchChange}
                        type="text"
                        placeholder="Search"
                        className="py-3 px-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                    />
                </div>
            <button onClick={() => setActive(!active)} 
            className='text-2xl'
            >{ active ? <MdGridOn /> : <LuGrid2X2 />}</button>
            </div>


            <div className={`grid gap-4 ${active ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
                {
                    filteredQueries.map((item, i) => (
                        <Fade  key={i}>
                            <article className="max-w-md mx-auto w-full mt-10 rounded-md">
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
                                        <h3 className="border flex items-center gap-2 text-blue-600 text-xl py-2 px-4 rounded">
                                            {item.recommendationCount > 0 ? <><FaThumbsUp /><span className='-mt-1'>{item.recommendationCount}</span></> : <FaRegThumbsUp />}
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
                        </Fade>
                    ))
                }
            </div>
        </section>
    );
};

export default Queries;