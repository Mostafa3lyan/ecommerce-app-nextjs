"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken(): Promise<string | null> {
    try {
        // Get session token from cookies
        const rawToken = (await cookies()).get("next-auth.session-token")?.value || (await cookies()).get("__Secure-next-auth.session-token")?.value;
        if (!rawToken) return null;

        // Decode using NextAuth secret
        const decoded = await decode({
            token: rawToken,
            secret: process.env.NEXTAUTH_SECRET!,
        });

        // Make sure we always return a string or null
        const accessToken =
            typeof decoded?.token === "string" ? decoded.token : null;

        return accessToken;
    } catch (error) {
        return null;
    }
}
