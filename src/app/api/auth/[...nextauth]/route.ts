import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";

import {
  githubClientId,
  githubClientSecret,
  googleClientId,
  googleClientSecret,
} from "@/config";

const GOOGLE_CLIENT_ID = googleClientId || "";
const GOOGLE_CLIENT_SECRET = googleClientSecret || "";
const GITHUB_CLIENT_ID = githubClientId || "";
const GITHUB_CLIENT_SECRET = githubClientSecret || "";

const authOption: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
