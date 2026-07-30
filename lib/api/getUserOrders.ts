"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function getUserOrders(id: string) {
    const token = await getMyToken();

    if (!token) {
        throw new Error("Please login first");
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`, {
        headers: {
            token,
            "Content-Type": "application/json",
        },
    });

    const payload = await res.json();
    return payload;
}
