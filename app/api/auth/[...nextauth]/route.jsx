import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/lib/axios";
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const res = await api.post("/auth/login", {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          });

          const data = res.data;

          if (!data?.success) {
            throw new Error(data.message || "Login failed");
          }

          return {
            id: String(data.id),
            name: data.name,
            email: data.email,
            role: data.role,
            token: data.token,
          };

        } catch (err) {

          // backend error message return
          const message =
            err.response?.data?.message ||
            err.message ||
            "Login failed";

          throw new Error(message);
        }
      }
    }),
  ],


  session: {
    strategy: "jwt",
  },

  callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
            token.role = user.role;
            token.name=user.name
            token.email = user.email;
            token.backendToken = user.token;
          }
          return token;
        },

     async session({ session, token }) {
       session.user = {
        ...session.user,
        id: token.id,
        role: token.role,
        name:token.name,
        email: token.email,
        token: token.backendToken,
       };

      return session;
     }
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };