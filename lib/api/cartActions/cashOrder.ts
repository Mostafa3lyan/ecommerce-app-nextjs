"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function cashOrder(cartId: string, address: {
    details: string;
    phone: string;
    city: string;
}) {
    const token = await getMyToken();

    if (!token) {
        throw new Error("Please login first");
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
        method: "POST",
        headers: {
            token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            shippingAddress: address,
        }),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to place order");
    }

    const payload = await res.json();
    return payload;
}
