import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useImageUpload from "../hooks/useImageUpload";
import { useState } from "react";

const AddQueries = () => {
    const navigate = useNavigate()
    const { user, setMyQueries } = useAuth();
    const axiosConfig = useAxiosSecure()
    const [isLoading, setIsLoading] = useState(false);
    const {uploadImage} = useImageUpload();

    const handelSubmit = async e => {
        setIsLoading(true)
        e.preventDefault();
        const form = e.target;
        const productImageURL = await uploadImage(form.image.files[0]);
        const boycottingReasonDetails = form.boycottingReasonDetails.value;
        const queryTitle = form.queryTitle.value;
        const productBrand = form.productBrand.value;
        const productName = form.productName.value;
        // -------------------------------------------------
        const userEmail = user.email;
        const userName = user.displayName;
        const userPhoto = user.photoURL;
        const timestamp = Date.now();
        const queryData = { boycottingReasonDetails, queryTitle, productBrand, productImageURL, productName, userEmail, userName, timestamp, userPhoto, recommendationCount: 0 }

        axiosConfig.post('/add-query', queryData)
            .then(res => {
                if (res.data.insertedId) {
                    setIsLoading(false)
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // axiosConfig.get('/my-queries', { params: { email: user?.email } })
                    axiosConfig.get(`/my-queries/${user?.email}`)
                        .then(res => setMyQueries(res.data))
                    navigate('/my-queries')
                    form.reset()
                }
            })
    }

    return (
        <div className="max-w-4xl mx-auto p-8 border rounded-md my-10">
            <h1 className="text-2xl font-bold text-center mb-6">Add New Queries</h1>
            <form onSubmit={handelSubmit} className="space-y-4">
                <div className="flex justify-between">
                    {/* Product Name */}
                    <div className="form-control w-[48%]">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input
                            type="text"
                            required
                            name="productName"
                            className="input input-bordered text-black"
                            placeholder="Enter Product Name"
                        />
                    </div>

                    {/* Product Brand */}
                    <div className="form-control w-[48%]">
                        <label className="label">
                            <span className="label-text">Product Brand</span>
                        </label>
                        <input
                            type="text" required
                            name="productBrand"
                            className="input input-bordered text-black"
                            placeholder="Enter Product Brand"
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    {/* Product Image-URL */}
                    <div className="form-control w-[48%]">
                        <label className="label">
                            <span className="label-text">Upload Product Image</span>
                        </label>
                        <input
                            type="file" required
                            name="image"
                            className="file-input file-input-neutral"
                        />
                    </div>


                    {/* Query Title */}
                    <div className="form-control w-[48%]">
                        <label className="label">
                            <span className="label-text">Query Title</span>
                        </label>
                        <input
                            type="text" required
                            name="queryTitle"
                            className="input input-bordered text-black "
                            placeholder="Enter Query Title"
                        />
                    </div>
                </div>

                <div className="flex justify-between">
                    {/* Boycotting Reason Details */}
                    <div className="form-control w-[48%]">
                        <label className="label">
                            <span className="label-text">Boycotting Reason Details</span>
                        </label>
                        <input
                            type="text" required
                            name="boycottingReasonDetails"
                            className="input input-bordered text-black "
                            placeholder="Enter Boycotting Reason Details"
                        />
                    </div>

                    {/* User Email */}
                    <div className="form-control w-[48%]">
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            readOnly
                            className="input input-bordered text-black "
                            value={user?.email}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="form-control">
                    <button type="submit" className="btn btn-primary w-full">
                        {
                            isLoading ?
                            <span className="loading loading-spinner loading-lg"></span> :
                            'Add New Queries'
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddQueries;