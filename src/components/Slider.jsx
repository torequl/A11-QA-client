// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import bgImg from '../assets/download.jpg'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../css/Style.css';

// import required modules
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const Slider = () => {
    return (
        <>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {/* Slide - 1 */}
                <SwiperSlide>
                    <div className="relative w-full h-[70vh] bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden">
                        <div className="absolute inset-0">
                            <img
                                src={bgImg}
                                alt="Background Image"
                                className="object-cover object-center w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black opacity-50" />
                        </div>
                        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
                            <h1 className="text-5xl font-bold leading-tight mb-4">
                            Have an any Queries?
                            </h1>
                            <p className="text-lg text-gray-300 mb-8">
                            If you have any Queries you can ask below or enter what you are looking for!
                            </p>
                            <Link
                                to='/login'
                                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide - 2 */}
                <SwiperSlide>
                <div className="relative w-full h-[70vh] bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden">
                        <div className="absolute inset-0">
                            <img
                                src='https://png.pngtree.com/thumb_back/fw800/background/20231005/pngtree-d-rendering-of-laptop-on-office-table-in-a-professional-work-image_13569035.png'
                                alt="Background Image"
                                className="object-cover object-center w-full h-full"
                            />
                            <div className="absolute inset-0 bg-black opacity-50" />
                        </div>
                        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
                            <h1 className="text-5xl font-bold leading-tight mb-4">
                            Have an any Queries?
                            </h1>
                            <p className="text-lg text-gray-300 mb-8">
                            If you have any Queries you can ask below or enter what you are looking for!
                            </p>
                            <Link
                                to='/login'
                                className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Slider;