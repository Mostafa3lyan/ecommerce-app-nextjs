"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Category } from "@/types/products.types";

export default function CategorySwiper({ data }: { data: Category[] }) {
    return (<>
        <div className="my-6">
            <h2 className="font-semibold text-xl mb-4">Shop Popular Categories</h2>
            <Swiper
                modules={[Pagination, Autoplay]}
                // pagination={{ clickable: true }}
                autoplay={{ delay: 3500 }}
                loop
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 5 },
                    1280: { slidesPerView: 7 },
                }}
                className="mySwiper"
            >
                {data.map((category) => (
                    <SwiperSlide key={category._id}>
                        <div className="flex flex-col items-center">
                            <div className="w-full  relative overflow-hidden">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    className="object-cover w-full h-[500px]  lg:h-[200px]"
                                    width={500}
                                    height={200}
                                />
                            </div>
                            <p className=" mt-1 text-center font-medium">{category.name}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </>

    );
}
