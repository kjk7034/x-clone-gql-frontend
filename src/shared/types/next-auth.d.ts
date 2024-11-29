import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    user: {
      /** User's unique identifier */
      id: string;
      /** User's email address */
      email: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    /** User's unique identifier */
    id: string;
    /** User's email address */
    email: string;
    /** JWT access token */
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    /** User's email address */
    email: string;
    /** JWT access token */
    accessToken: string;
  }
}
