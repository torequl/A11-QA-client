import 'swiper/css';
import Slider from '../components/Slider';
import RecentQueries from '../components/RecentQueries';
import { useLoaderData } from 'react-router-dom';
import Newsletter from '../components/Newsletter';
import Feature from '../components/Feature';
const Home = () => {
    const loadedData = useLoaderData()
    
    return (
        <div>
            <Slider/>

            <RecentQueries loadedData={loadedData}/>

            <Newsletter/>

            <Feature/>
        </div>
    );
};

export default Home;