"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function getUserCart() {
    const token = await getMyToken();

    if (!token) {
        throw new Error("Please login first");
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
            token,
            "Content-Type": "application/json",
        },
    });

    const payload = await res.json();
    return payload;
}
