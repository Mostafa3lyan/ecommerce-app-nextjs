"use client";
import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import getUserCart from "@/api/cartActions/getUserCart";
import { CartProduct } from "@/types/cart.types";
import { useSession } from "next-auth/react";

// Define context value type
interface CartContextType {
    cartProducts: CartProduct[];
    setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
    loading: boolean;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartContextProvider({ children }: { children: ReactNode }) {
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();

    useEffect(() => {
        async function fetchCart() {
            if (!session) {
                // 🚫 Not logged in → don’t call API
                setCartProducts([]);
                setLoading(false);
                return;
            }

            try {
                const res = await getUserCart();
                if (res.status === "success") {
                    setCartProducts(res.data.products);
                }
            } catch (err) {
                console.error("❌ Failed to load cart:", err);
            } finally {
                setLoading(false);
            }
        }

        // Only run when login state changes
        if (status !== "loading") {
            fetchCart();
        }
    }, [session, status]);

    return (
        <CartContext.Provider
            value={{ cartProducts, setCartProducts, loading }}
        >
            {children}
        </CartContext.Provider>
    );
}

// Custom hook with safety check
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;
}
