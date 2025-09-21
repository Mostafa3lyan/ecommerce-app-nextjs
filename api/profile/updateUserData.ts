"use server";
import getMyToken from "@/utilities/getMyToken";

export default async function updateUserData(name: string, email: string, phone: string) {
    const token = await getMyToken();

    if (!token) {
        throw new Error("Please login first");
    }

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, {
        method: "PUT",
        headers: {
            token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone }),
    });

    const payload = await res.json();
    return payload;
}
