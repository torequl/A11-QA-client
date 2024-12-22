import 'swiper/css';
import Slider from '../components/Slider';
import RecentQueries from '../components/RecentQueries';
import { useLoaderData } from 'react-router-dom';
const Home = () => {
    const loadedData = useLoaderData()
    
    return (
        <div>
            <Slider/>

            <RecentQueries loadedData={loadedData}/>
        </div>
    );
};

export default Home;