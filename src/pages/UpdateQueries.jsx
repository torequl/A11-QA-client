import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const UpdateQueries = () => {
    const itemData = useLoaderData()
    console.log(itemData);
    const { setMyQueries, user } = useAuth()

    const navigate = useNavigate()


    const handelSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const boycottingReasonDetails = form.boycottingReasonDetails.value;
        const queryTitle = form.queryTitle.value;
        const productImageURL = form.productImageURL.value;
        const productBrand = form.productBrand.value;
        const productName = form.productName.value;
        // -------------------------------------------------
        const timestamp = Date.now();
        const queryData = { boycottingReasonDetails, queryTitle, productBrand, productImageURL, productName, timestamp }

        axios.put(`http://localhost:5000/update/${itemData._id}`, queryData)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    axios.get('http://localhost:5000/my-queries', { params: { email: user?.email } })
                        .then(res => setMyQueries(res.data))
                        navigate('/my-queries')

                }
                form.reset()
            }).catch(error => console.log(error))
    }




    return (
        <>
            <div className="max-w-4xl mx-auto p-8 border rounded-md my-10">
                <h1 className="text-2xl font-bold text-center mb-6">Update Queries</h1>
                <form onSubmit={handelSubmit} className="space-y-4">
                    <div className="flex justify-between">
                        {/* Product Name */}
                        <div className="form-control w-[48%]">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={itemData?.productName}
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
                                defaultValue={itemData?.productBrand}
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
                                <span className="label-text">Product Image-URL</span>
                            </label>
                            <input
                                type="text" required
                                defaultValue={itemData?.productImageURL}
                                name="productImageURL"
                                className="input input-bordered text-black "
                                placeholder="Enter Product Image-URL"
                            />
                        </div>

                        {/* Query Title */}
                        <div className="form-control w-[48%]">
                            <label className="label">
                                <span className="label-text">Query Title</span>
                            </label>
                            <input
                                type="text" required
                                defaultValue={itemData?.queryTitle}
                                name="queryTitle"
                                className="input input-bordered text-black "
                                placeholder="Enter Query Title"
                            />
                        </div>
                    </div>

                    {/* Boycotting Reason Details */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Boycotting Reason Details</span>
                        </label>
                        <input
                            type="text" required
                            defaultValue={itemData?.boycottingReasonDetails}
                            name="boycottingReasonDetails"
                            className="input input-bordered text-black "
                            placeholder="Enter Boycotting Reason Details"
                        />
                    </div>

                    {/* Submit Button */}
                    <button className="btn form-control btn-primary w-full">
                        Add New Queries
                    </button>
                </form>
            </div>
        </>
    );
};

export default UpdateQueries;