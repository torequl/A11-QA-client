// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import '../css/Style.css';

// import required modules
import { Navigation } from 'swiper/modules';

const Slider = () => {
    return (
        <>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {/* Slide - 1 */}
                <SwiperSlide>
                    <section>
                        <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
                            <div className="space-y-5 max-w-4xl mx-auto text-center">
                                <h1 className="text-sm text-indigo-600 font-medium">
                                    Build products for everyone
                                </h1>
                                <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
                                    Design your projects faster with  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">the largest figma UI kit</span>
                                </h2>
                                <p className="max-w-2xl mx-auto">
                                    Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
                                </p>
                                <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                                    <a href="/" className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none">
                                        Browse courses
                                    </a>
                                    <a href="/" className="block py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg">
                                        Get access
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </SwiperSlide>

                {/* Slide - 2 */}
                <SwiperSlide>
                    <section>
                        <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8">
                            <div className="space-y-5 max-w-4xl mx-auto text-center">
                                <h1 className="text-sm text-indigo-600 font-medium">
                                    Build products for everyone
                                </h1>
                                <h2 className="text-4xl text-gray-800 font-extrabold mx-auto md:text-5xl">
                                    Design your projects faster with  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">the largest figma UI kit</span>
                                </h2>
                                <p className="max-w-2xl mx-auto">
                                    Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
                                </p>
                                <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                                    <a href="/" className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none">
                                        Browse courses
                                    </a>
                                    <a href="/" className="block py-2 px-4 text-gray-700 hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg">
                                        Get access
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Slider;