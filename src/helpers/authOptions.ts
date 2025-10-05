import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string | null;
            email: string | null;
            image: string | null;
        };
    }
    interface User {
        id: string;
        name: string | null;
        email: string | null;
        image: string | null;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    if (!res.ok) {
                        console.error("Login failed:", await res.text());
                        return null;
                    }

                    const data = await res.json();
                    const user = data?.data || data;

                    if (!user?.id)  return null;

                    return {
                        id: String(user.id ),
                        name: user.name || null,
                        email: user.email || null,
                        image: user.avatar || null,
                    };
                } catch (err) {
                    console.error("Authorize Error:", err);
                    return null;
                }
            },
        }),
    ],

    // session: {
    //     strategy: "jwt", // ✅ Must include this
    // },

    secret: process.env.AUTH_SECRET,

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        }
    },
    pages: {
        signIn: "/login",
    },
};
