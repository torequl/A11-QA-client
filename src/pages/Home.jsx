import 'swiper/css';
import Slider from '../components/Slider';
import RecentQueries from '../components/RecentQueries';
import Newsletter from '../components/Newsletter';
import TeamSection from '../components/TeamSection';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Home = () => {
    const axiosConfig = useAxiosSecure()
    const [loadedData, setLoaderData] = useState([]);

    useEffect(()=> {
        axiosConfig.get('/recent-queries')
        .then(res => setLoaderData(res.data))
    },[])

    return (
        <div>
            <Slider />

            <RecentQueries loadedData={loadedData} />

            <Newsletter />

            <TeamSection />
        </div>
    );
};

export default Home;