"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function getWishlist() {
    try {
        // Get the token
        const token = await getMyToken();

        // If no token, throw an error prompting the user to log in
        if (!token) {
            throw new Error("Please log in first.");
        }

        // Fetch the wishlist data from the API
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: {
                token,
                "Content-Type": "application/json",
            },
        });

        // Check if the response status is OK (2xx status code)
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to load wishlist.");
        }

        // Parse the response JSON if the status is OK
        const payload = await res.json();
        return payload;  // Return the wishlist data

    } catch (error) {
        // Log the error to the console for debugging
        console.error("Error fetching wishlist:", error);

        // Return a consistent error structure to the front end
        return {
            success: false,
            message: error instanceof Error ? error.message : "An unknown error occurred."
        };
    }
}
