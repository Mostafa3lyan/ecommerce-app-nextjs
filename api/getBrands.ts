"use server"

import { brandsTypes } from "@/types/brands.types";

export default async function getBrands(): Promise<brandsTypes[]> {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands")
    const { data } = await response.json();
    return data;

}
