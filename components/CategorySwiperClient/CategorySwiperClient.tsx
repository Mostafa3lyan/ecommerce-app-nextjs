"use client";

import dynamic from "next/dynamic";
import { Category } from "@/types/products.types";

// Load CategorySwiper dynamically on client only
const CategorySwiper = dynamic(() => import("./../categorySwiper/categorySwiper"), {
    ssr: false,
});

export default function CategorySwiperClient({ data }: { data: Category[] }) {
    return <CategorySwiper data={data} />;
}
