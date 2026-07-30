"use server";

export default async function resetPassword(email: string, newPassword: string) {
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                newPassword
            }),
        });

        if (!res.ok) throw new Error("Failed to reset password");
        return await res.json();
    } catch (error) {
        throw new Error("Failed to process password reset");
    }
}