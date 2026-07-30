"use server";
import getMyToken from '@/utilities/getMyToken';

export default async function addToWishlistapi(id: string) {
    try {
        const token = await getMyToken();

        if (!token) {
            return { success: false, status: 401, message: "Please login first to add product to wishlist" };
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
            return { success: false, message: errorData.message || "Failed to add product to wishlist" };
        }

        const payload = await res.json();
        return payload;
    } catch (error: any) {
        console.error("addToWishlistapi error:", error);
        return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
    }
}
