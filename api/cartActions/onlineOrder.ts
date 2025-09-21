"use server";
import getMyToken from "@/utilities/getMyToken";

type Address = {
    details: string;
    phone: string;
    city: string;
};

export default async function placeOrder(
    method: "cash" | "online",
    cartId: string,
    address: Address,
    redirectUrl?: string // only used for online orders
) {
    const token = await getMyToken();
    if (!token) throw new Error("Please login first");

    let endpoint = "";
    let body: any = {};

    if (method === "cash") {
        // Cash order endpoint
        endpoint = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
        body = { shippingAddress: address };
    } else {
        if (!redirectUrl) {
            throw new Error("Redirect URL is required for online payment");
        }
        // Online order endpoint
        endpoint = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${redirectUrl}`;
        body = { shippingAddress: address };
    }

    const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to place order");
    }

    return res.json();
}
