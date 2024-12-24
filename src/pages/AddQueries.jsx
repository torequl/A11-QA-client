import axios from "axios";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddQueries = () => {
    const navigate = useNavigate()
    const { user, setMyQueries } = useAuth();

    const handelSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const boycottingReasonDetails = form.boycottingReasonDetails.value;
        const queryTitle = form.queryTitle.value;
        const productImageURL = form.productImageURL.value;
        const productBrand = form.productBrand.value;
        const productName = form.productName.value;
        // -------------------------------------------------
        const userEmail = user.email;
        const userName = user.displayName;
        const userPhoto = user.photoURL;
        const timestamp = Date.now();
        const queryData = { boycottingReasonDetails, queryTitle, productBrand, productImageURL, productName, userEmail, userName, timestamp, userPhoto }

        axios.post('http://localhost:5000/add-query', queryData)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
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
                            <span className="label-text">Product Image-URL</span>
                        </label>
                        <input
                            type="text" required
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
                        Add New Queries
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddQueries;