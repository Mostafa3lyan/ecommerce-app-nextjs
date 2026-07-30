"use server";

export default async function verifyCode(otp: string) {
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resetCode: otp }),
        });

        if (!res.ok) throw new Error("Failed to verify code");
        return await res.json();
    } catch (error) {
        throw new Error("Failed to process code verification");
    }
}