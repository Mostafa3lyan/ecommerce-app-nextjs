"use client";
import { useWishlist } from "@/context/wishlistContext"; // Import custom hook
import { Spinner } from "@heroui/spinner";
import { Trash } from "lucide-react";
import { wishlistType } from "@/types/wishlist.types";
import { useState } from "react";

export default function Wishlist() {
    const { wishlistProducts, error, removeFromWishlist } = useWishlist(); // Use custom hook
    const [loadingId, setLoadingId] = useState<string | null>(null);

    // Handle error state
    if (error) {
        return (
            <div className="text-center py-10 text-red-500 text-lg">
                {error}
            </div>
        );
    }

    // Handle empty wishlist state
    if (wishlistProducts.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 text-lg">
                Your wishlist is empty ❤️
            </div>
        );
    }

    // Handle remove from wishlist action
    const handleRemove = async (id: string) => {
        setLoadingId(id); // Set loading for the specific product
        await removeFromWishlist(id); // Remove item
        setLoadingId(null); // Reset loading after action
    };

    // Render wishlist items
    return (
        <div className="w-full md:w-3/4 mx-auto">
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Product</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlistProducts.map((product: wishlistType) => (
                            <tr
                                key={product._id}
                                className="bg-white border-t dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="p-4">
                                    <img
                                        src={product.imageCover}
                                        alt={product.title}
                                        className="w-16 md:w-24 object-cover"
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    {product.title}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    ${product.price}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        type="button"
                                        aria-label="Remove"
                                        onClick={() => handleRemove(product._id)}
                                        className="cursor-pointer text-red-600 dark:text-red-500 hover:underline hover:text-red-500"
                                    >
                                        {loadingId === product._id ? (
                                            <Spinner size="sm" color="danger" />
                                        ) : (
                                            <Trash size={16} />
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
