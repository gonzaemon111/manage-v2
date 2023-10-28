import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "http://localhost:3000",
  providers: [
    GithubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // strategyがjwtの場合
      if (user?.name) {
        token.name = user.name;
      }
      return token;
    },
  },
  theme: {
    colorScheme: "auto",
    logo:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/icon.png"
        : "/icon.png",
    brandColor: "#5eead4",
  },
};
