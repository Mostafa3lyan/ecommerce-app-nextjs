"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import img1 from "../../assets/images/grocery-banner.png"
import img2 from "../../assets/images/grocery-banner-2.jpeg"
import img3 from "../../assets/images/slider-2.jpeg"
import img4 from "../../assets/images/banner-4.jpeg"
import img5 from "../../assets/images/slider-image-1.jpeg"
import img6 from "../../assets/images/slider-image-2.jpeg"
import img7 from "../../assets/images/slider-image-3.jpeg"
import Image from 'next/image';

const MainSlider = () => {
    return (
        <div className="flex flex-col md:flex-row ">
            {/* Main Slider */}
            <div className="w-full md:w-3/4 ">
                <Swiper
                    slidesPerView={1}
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    loop={true}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <Image src={img1} alt="slider grocery img" className="w-full object-cover h-[250px] md:h-[400px]" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={img2} alt="slider grocery img" className="w-full object-cover h-[250px] md:h-[400px]" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={img3} alt="slider grocery img" className="w-full object-cover h-[250px] md:h-[400px]" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={img4} alt="slider grocery img" className="w-full object-cover h-[250px] md:h-[400px]" />
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* Side Banners */}
            <div className="w-full md:w-1/4 flex flex-col ">
                <Image src={img6} alt="side banner" className="w-full object-cover h-[150px] md:h-[200px]" />
                <Image src={img7} alt="side banner" className="w-full object-cover h-[150px] md:h-[200px]" />
            </div>
        </div>
    );
};

export default MainSlider;
