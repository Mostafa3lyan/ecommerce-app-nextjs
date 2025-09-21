import { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";


export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",

    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "" }
                , password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const res = await fetch(`${process.env.API}/auth/signin`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials)
                });
                const payload = await res.json();
                if (res.ok && payload) {
                    const decodedToken: { id: string } = jwtDecode(payload.token);
                    return {
                        id: decodedToken.id,
                        user: payload.user, // name , email , role
                        token: payload.token
                    };
                }
                throw new Error(payload.message || "Signin failed");
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user.user;
                token.token = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user as User["user"];
            return session;
        },
    }
};