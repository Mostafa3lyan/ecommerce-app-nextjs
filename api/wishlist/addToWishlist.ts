"use server";
import getMyToken from '../../utilities/getMyToken';

export default async function addToWishlistapi(id: string) {
    try {
        const token = await getMyToken();

        if (!token) {
            throw new Error("Please login first to add product to wishlist");
        }

        const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
            method: "POST",
            headers: {
                token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: id }),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to add product to wishlist");
        }

        const payload = await res.json();
        return payload;
    } catch (error: any) {
        // You can either throw to let client catch:
        throw error;

        // OR, if you prefer to handle gracefully:
        // return { status: "error", message: error.message || "Unknown error" };
    }
}
