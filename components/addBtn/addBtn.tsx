"use client";
import addToCart from '@/api/cartActions/addToCart';
import { useCart } from '@/context/CartContext';
import { Button } from '@heroui/button';
import { addToast } from '@heroui/toast';
import { ShoppingCart } from 'lucide-react';

const AddBtn = ({ id }: { id: string }) => {
    const { cartProducts, setCartProducts } = useCart();

    async function handleAddToCart(id: string) {
        try {
            const res = await addToCart(id);
            if (res.status === "success") {
                // update global cart state with fresh data from backend
                setCartProducts(res.data.products);
                addToast({
                    title: "Success",
                    description: "Product added to cart successfully!",
                    color: "success",
                    variant: "flat",
                });
            } else {
                addToast({
                    title: "Error",
                    description: res.message,
                    color: "danger",
                    variant: "flat",
                });
            }
        } catch (err) {
            console.error("❌ Add to cart failed:", err);
            addToast({
                title: "Error",
                description: "request failed",
                color: "danger",
                variant: "flat",
            });
        }
    }

    return (
        <Button
            className="bg-green-600 text-slate-50 rounded-t-none text-medium flex items-center gap-2 w-full pointer-events-auto"
            onPress={() => handleAddToCart(id)}
        >
            + add to cart
            <ShoppingCart size={20} />
        </Button>
    );
};

export default AddBtn;
