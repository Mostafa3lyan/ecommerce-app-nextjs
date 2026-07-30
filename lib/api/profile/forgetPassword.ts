"use server";

export default async function forgetPassword(email: string) {
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (!res.ok) throw new Error("Failed to send reset request");
        return await res.json();
    } catch (error) {
        throw new Error("Failed to process password reset");
    }
}