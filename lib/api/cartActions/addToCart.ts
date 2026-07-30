"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function addToCart(id: string) {

    try {
        const token = await getMyToken();

        if (!token) {
            throw new Error("Please login first to add product to cart");
        }

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            method: "POST",
            headers: {
                token: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId: id,
            }),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to add product to cart");
        }
        const payload = await res.json();
        return payload;
    }
    catch (error) {
        return error
    }

}
