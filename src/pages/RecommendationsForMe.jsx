import { useLoaderData } from "react-router-dom";

const RecommendationsForMe = () => {

    const loadedData = useLoaderData()
    console.dir(loadedData);

    return (
        <div>
            <div className="overflow-x-auto max-w-6xl mx-auto">
                {
                    loadedData.length > 0 ?
                    <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="bg-blue-100">
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Product Name</th>
                            <th>Reason</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            loadedData.map((item, i) =>
                                <tr key={item._id}>
                                    <td>{i + 1}</td>
                                    <td>{item.recommendationUserName}</td>
                                    <td>{item.recommendationEmail}</td>
                                    <td>{item.recommendedProductName}</td>
                                    <td>{item.recommendationReason}</td>
                                    <td>{item.currentDate}</td>
                                </tr>)
                        }

                    </tbody>
                </table> 
                :
                <h2 className="text-2xl text-red-500 text-center">You Do not have any Recommendations </h2>
                }
            </div>
        </div>
    );
};

export default RecommendationsForMe;