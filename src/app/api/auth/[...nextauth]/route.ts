import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { googleClientId, googleClientSecret } from "@/config";

const GOOGLE_CLIENT_ID = googleClientId || "";
const GOOGLE_CLIENT_SECRET = googleClientSecret || "";

const authOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
