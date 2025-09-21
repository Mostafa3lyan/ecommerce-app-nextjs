"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/wishlistContext"; // Import the context

type WishlistBtnProps = {
    id: string;
};

const WishlistBtn = ({ id }: WishlistBtnProps) => {
    const { wishlistProducts, addToWishlist, removeFromWishlist, loading } = useWishlist();
    const [loadingId, setLoadingId] = useState<string | null>(null); // Track loading state per product

    // Check if the product is in the wishlist
    const inWishlist = wishlistProducts.some((product) => product._id === id);

    // Handle the wishlist action (add/remove)
    const handleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Set loading state for the specific product
        setLoadingId(id);

        // If the item is already in the wishlist, remove it
        if (inWishlist) {
            await removeFromWishlist(id);
        } else {
            await addToWishlist(id);
        }

        // Reset loading state after operation
        setLoadingId(null);
    };

    return (
        <span
            role="button"
            onClick={handleWishlist}
            className={`p-1 cursor-pointer transition-colors ${loadingId === id ? "opacity-50 pointer-events-none" : ""}`}
            aria-label={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
            <Heart
                className={` hover:scale-120 ${inWishlist ? "text-red-600" : "text-gray-400"} ${loadingId === id ? "opacity-50" : ""} `}
                size={20}
                fill={inWishlist ? "currentColor" : "none"}
            />
        </span>
    );
};

export default WishlistBtn;
