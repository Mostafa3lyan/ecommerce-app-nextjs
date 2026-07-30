"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { wishlistType } from "@/types/wishlist.types";
import getWishlist from "@/api/wishlist/getWishlist";
import removeWishlist from "@/api/wishlist/removeWishlist";
import addToWishlistapi from "@/api/wishlist/addToWishlist"; // Import addToWishlist API
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

    // Fetch wishlist products
    const fetchWishlist = async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await getWishlist();

            // Support both old ({ status: 'success', data }) and new ({ success: boolean, status, message }) shapes
            if (result && (result.status === "success" || result.success === true)) {
                const data = result.data || result.products || [];
                setWishlistProducts(data);
            } else {
                // If unauthenticated, silently set empty wishlist
                if (result && result.status === 401) {
                    setWishlistProducts([]);
                } else {
                    setError("Failed to fetch wishlist");
                }
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Add item to wishlist
    const addToWishlist = async (id: string) => {
        try {
            const res = await addToWishlistapi(id); // API call to add to wishlist

            // If API returned structured failure
            if (res && res.success === false) {
                // If unauthenticated, prompt login
                if (res.status === 401) {
                    addToast({
                        title: "Login required",
                        description: "Please log in to add items to your wishlist",
                        color: "danger",
                        variant: "flat",
                    });
                    router.push('/login');
                    return res;
                }

                // Other errors
                addToast({
                    title: "Error",
                    description: res.message || "Failed to add item to wishlist",
                    color: "danger",
                    variant: "flat",
                });

                return res;
            }

            // Legacy successful shape
            if (res && res.status === "success") {
                addToast({
                    title: "Added",
                    description: "Product added to wishlist",
                    color: "success",
                    variant: "flat",
                });
                fetchWishlist();  // Re-fetch wishlist after adding item
                return res;
            }

            // If response contains data and no explicit shape, treat as success
            if (res && (res.data || res.products)) {
                addToast({
                    title: "Added",
                    description: "Product added to wishlist",
                    color: "success",
                    variant: "flat",
                });
                fetchWishlist();
                return res;
            }

            // Unknown response
            addToast({
                title: "Error",
                description: "Failed to add item to wishlist",
                color: "danger",
                variant: "flat",
            });

            return res;
        } catch (err) {
            setError("Failed to add item to wishlist");
            addToast({
                title: "Error",
                description: "Request failed",
                color: "danger",
                variant: "flat",
            });
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
