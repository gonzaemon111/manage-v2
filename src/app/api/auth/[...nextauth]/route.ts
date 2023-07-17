import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET ?? "http://localhost:3001",
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // strategyがjwtの場合
      if (user?.name) {
        console.log(user);
        token.name = user.name;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
