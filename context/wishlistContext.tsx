"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { wishlistType } from "@/types/wishlist.types";
import getWishlist from "@/api/wishlist/getWishlist";
import removeWishlist from "@/api/wishlist/removeWishlist";
import addToWishlistapi from "@/api/wishlist/addToWishlist"; // Import addToWishlist API

// Define the context type
export interface WishlistContextType {
    wishlistProducts: wishlistType[];
    loading: boolean;
    error: string | null;
    addToWishlist: (id: string) => void;  // Add this to context
    removeFromWishlist: (id: string) => void;
}

// Create context with a default value
const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Wishlist provider component
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlistProducts, setWishlistProducts] = useState<wishlistType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch wishlist products
    const fetchWishlist = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getWishlist();
            if (result && result.status === "success") {
                setWishlistProducts(result.data);
            } else {
                setError("Failed to fetch wishlist");
            }
        } catch (err) {
            setError("Error fetching wishlist");
        } finally {
            setLoading(false);
        }
    };

    // Call fetchWishlist when component mounts
    useEffect(() => {
        fetchWishlist();
    }, []);

    // Add item to wishlist
    const addToWishlist = async (id: string) => {
        try {
            const res = await addToWishlistapi(id); // API call to add to wishlist
            if (res && res.status === "success") {
                fetchWishlist();  // Re-fetch wishlist after adding item
            }
            return res;
        } catch (err) {
            setError("Failed to add item to wishlist");
        }
    };

    // Remove item from wishlist
    const removeFromWishlist = async (id: string) => {
        const res = await removeWishlist(id);
        if (res && res.status === "success") {
            fetchWishlist(); // Re-fetch wishlist after removing item
        }
        return res;
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlistProducts,
                loading,
                error,
                addToWishlist,  // Provide addToWishlist function in context
                removeFromWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

// Custom hook to use WishlistContext
export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};
