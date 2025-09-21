"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function removeWishlist(id: string) {
    // Get the token
    const token = await getMyToken();

    // If no token, throw an error prompting the user to log in
    if (!token) {
        throw new Error("Please log in first.");
    }

    try {
        // Make the DELETE request to the API
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            method: "DELETE",
            headers: {
                token,
                "Content-Type": "application/json",
            },
        });

        // Check if the response is successful
        if (!res.ok) {
            // Handle non-2xx HTTP responses
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to remove item from wishlist.");
        }

        // Parse the response payload
        const payload = await res.json();

        // You can customize this return value based on what your API sends back
        return payload;
    } catch (error) {
        // Log any network or fetch-related errors
        console.error("Error removing item from wishlist:", error);
        throw new Error("An error occurred while removing the item from your wishlist.");
    }
}
