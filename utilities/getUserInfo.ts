"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getUserInfo(): Promise<Record<string, any> | null> {
    try {
        const cookieStore = cookies();
        const rawToken = (await cookies()).get("next-auth.session-token")?.value || (await cookies()).get("__Secure-next-auth.session-token")?.value;

        if (!rawToken) return null;

        const decoded = await decode({
            token: rawToken,
            secret: process.env.NEXTAUTH_SECRET!,
        });

        return decoded || null;
    } catch (error) {
        console.error("❌ Failed to decode userInfo:", error);
        return null;
    }
}
