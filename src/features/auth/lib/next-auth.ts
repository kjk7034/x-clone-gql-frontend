import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authService } from "../api/auth-service";
import {
  GraphQLError,
  handleGraphQLError,
  ERROR_CODES,
} from "@/shared/api/errors";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new GraphQLError(
            "이메일과 비밀번호를 입력해주세요.",
            ERROR_CODES.AUTH.VALIDATION_ERROR
          );
        }

        try {
          const response = await authService.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (!response) {
            return null; // User | null 타입을 만족시키기 위해 null 반환
          }

          const { access_token } = response;
          // User 타입을 명시적으로 반환
          const user = {
            id: credentials.email,
            email: credentials.email,
            accessToken: access_token,
          };

          return user;
        } catch (error) {
          handleGraphQLError(error, {
            context: "NextAuth Authorize",
            defaultMessage: "로그인 중 오류가 발생했습니다.",
          });
          return null; // 에러 발생 시 null 반환
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
};
