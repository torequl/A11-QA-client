import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { toast } from "react-toastify";

const ViewDetails = () => {
    const query = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/recommendations/${query._id}`)
            .then(res => {
                setRecommendations(res.data)
            })
    }, [query])

    const handelSubmitRecommendation = e => {
        e.preventDefault()
        const form = e.target;
        const recommendationTitle = form.recommendationTitle.value;
        const recommendedProductName = form.recommendedProductName.value;
        const recommendedProductImageUrl = form.recommendedProductImageUrl.value;
        const recommendationReason = form.recommendationReason.value;
        //--------------------------------------------------------------------------
        const queryId = query._id;
        const userPhoto = user.photoURL;
        const recommendationEmail = user.email;
        const recommendationUserName = user.displayName;
        const currentDate = new Date().toLocaleDateString('en-UK');
        const formData = { recommendationTitle, recommendedProductName, recommendedProductImageUrl, recommendationReason, queryId, recommendationEmail, recommendationUserName, userPhoto, currentDate }

        axios.post('http://localhost:5000/recommendation', formData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Your Recommendation Added Successfully.",
                        icon: "success"
                    });
                } navigate(`/my-recommendations/${user.email}`)
            })
            .catch(({response}) => toast.error(response.data.error))
    }

    return (
        <>
            <div className="gap-8 max-w-5xl w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2">
                <div className="card bg-base-100 border">
                    <figure>
                        <img
                            referrerPolicy="no-referrer"
                            className="h-52"
                            src={query.productImageURL}
                            alt={query.productName} />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{query.productName}</h2>
                        <p>{query.queryTitle}</p>
                        <div className="divider"></div>
                        <div className="flex gap-2 items-center">
                            <div>
                                <img referrerPolicy="no-referrer"
                                    className="w-14 rounded-full" src={query.userPhoto} alt={query.userName} />
                            </div>
                            <div>
                                <h3 className="text-xl">{query.userName}</h3>
                                <p>{new Date(query.timestamp).toLocaleDateString("en-UK")}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border">
                    <h3 className="text-2xl text-center my-4 font-bold">Recommendation</h3>
                    <form onSubmit={handelSubmitRecommendation} className="flex flex-col items-center">
                        <div className="form-control w-11/12">
                            <label className="label">
                                <span className="label-text">Recommendation Title</span>
                            </label>
                            <input
                                type="text"
                                required
                                name="recommendationTitle"
                                className="input input-bordered text-black"
                                placeholder="Recommendation Title"
                            />
                        </div>

                        <div className="form-control w-11/12">
                            <label className="label">
                                <span className="label-text">Recommended product Name</span>
                            </label>
                            <input
                                type="text"
                                required
                                name="recommendedProductName"
                                className="input input-bordered text-black"
                                placeholder="Recommended product Name"
                            />
                        </div>

                        <div className="form-control w-11/12">
                            <label className="label">
                                <span className="label-text">Recommended Product Image URL</span>
                            </label>
                            <input
                                type="text"
                                required
                                name="recommendedProductImageUrl"
                                className="input input-bordered text-black"
                                placeholder="Recommended Product Image URL"
                            />
                        </div>

                        <div className="form-control w-11/12">
                            <label className="label">
                                <span className="label-text">Recommendation reason</span>
                            </label>
                            <input
                                type="text"
                                required
                                name="recommendationReason"
                                className="input input-bordered text-black"
                                placeholder="Recommendation reason"
                            />
                        </div>
                        <button className="btn btn-primary w-11/12 mt-4">Add Recommendation</button>
                    </form>
                </div>
            </div>
            <div className="divider my-10"></div>
            <div className="my-10">
                <h3 className="text-2xl font-bold uppercase text-center">Recommendations</h3>
                {
                    recommendations.map(items =>
                        <article className="max-w-md mx-auto mt-4 hover:shadow-lg border rounded-md duration-300 shadow-sm" key={items._id}>
                                <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                                    <div className="flex-none w-10 h-10 rounded-full">
                                        <img src={items.userPhoto} className="w-full h-full rounded-full" alt={items.recommendationUserName} />
                                    </div>
                                    <div className="ml-3">
                                        <span className="block text-gray-900">{items.recommendationUserName}</span>
                                        <span className="block text-gray-400 text-sm">{items.currentDate}</span>
                                    </div>
                                </div>
                                <div className="pt-3 ml-4 mr-2 mb-3">
                                    <h3 className="text-xl text-gray-900">
                                        Title: {items.recommendationTitle}
                                    </h3>
                                    <p className="text-gray-600 flex items-center gap-2 text-base mt-1">
                                       <FaArrowCircleRight/> Product Name: {items.recommendedProductName}
                                    </p>
                                    <p className="text-gray-600 flex items-center gap-2 text-base mt-1">
                                       <FaArrowCircleRight/> Reason: {items.recommendationReason}
                                    </p>
                                    
                                </div>
                        </article>
                    )
                }
            </div>
        </>
    );
};

export default ViewDetails;