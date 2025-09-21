"use client";
import { productType } from '@/types/products.types';
import { Heart, Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import AddBtn from '../addBtn/addBtn';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import relatedCategory from '@/api/relatedCategory';
import SingleProduct from '../singleProduct/singleProduct';
import WishlistBtn from '../wishlistBtn/wishlistBtn';

const Details = ({ data }: { data: productType }) => {
    const [relatedProducts, setRelatedProducts] = useState<productType[]>([]);
    const [loading, setLoading] = useState(true);

    async function getRelatedProducts(catId: string) {
        try {
            setLoading(true);
            const res = await relatedCategory(catId);
            setRelatedProducts(res);
        } catch (error) {
            console.error("❌ Failed to fetch related products", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (data?.category?._id) {
            getRelatedProducts(data.category._id);
        }
    }, [data?.category?._id]);

    return (
        <div className="my-20">
            {/* Product Section */}
            <div className="row flex flex-col lg:flex-row place-items-center gap-5 p-2">
                {/* Images */}
                <div className="w-full lg:w-1/3">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        loop
                        slidesPerView={1}
                        className="mySwiper"
                    >
                        {data?.images?.length ? (
                            data.images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <Image
                                        src={img}
                                        alt={data.title}
                                        className="w-full h-auto object-cover"
                                        width={500}
                                        height={200}
                                    />
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide>
                                <Image
                                    src="/no-image.png"
                                    alt="No image available"
                                    className="w-full h-auto object-cover"
                                    width={500}
                                    height={200}
                                />
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>

                {/* Info */}
                <div className="w-full lg:w-2/3">
                    <div className="w-[90%] p-4">
                        <div className="flex flex-col items-start gap-1 text-left w-full">
                            <h4 className="font-semibold">{data.title}</h4>
                            <h3 className="text-default-500 my-1">{data.description}</h3>
                            <div className="flex justify-between w-full items-center">
                                <h3 className="text-green-600">{data.category.name}</h3>
                                <WishlistBtn id={data.id} />

                            </div>
                        </div>
                        <div className="flex justify-between w-full my-2">
                            <span className="text-foreground">{data.price} EGP</span>
                            <span className="text-foreground flex justify-center items-center gap-1">
                                {data.ratingsAverage}
                                <Star className="text-yellow-400" size={15} fill="currentColor" />
                            </span>
                        </div>
                        <AddBtn id={data.id} />
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="row mt-10">
                <h3 className="text-xl font-semibold mb-4">Related Products</h3>

                {loading ? (
                    <p className="text-gray-500 p-4">Loading related products...</p>
                ) : relatedProducts.length ? (
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        autoplay={{ delay: 4000 }}
                        loop
                        spaceBetween={20}
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 6 },
                        }}
                        className="mySwiper"
                    >
                        {relatedProducts.map((currentProduct: productType) => (
                            <SwiperSlide key={currentProduct.id} className="h-auto">
                                <div className="p-2 h-full flex">
                                    <div className="w-full flex flex-col h-full">
                                        <SingleProduct product={currentProduct} />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className="text-gray-500 p-4">No related products found</p>
                )}
            </div>
        </div>
    );
};

export default Details;
