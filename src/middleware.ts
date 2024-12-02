import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    const isAuth = !!req.nextauth.token;

    // 이미 인증된 사용자가 로그인/회원가입 페이지 접근 시도
    if (isAuth && ["/login", "/create-account"].includes(pathname)) {
      console.log("Redirecting authenticated user from auth pages to home");
      return NextResponse.redirect(new URL("/", req.url));
    }

    // 미인증 사용자의 보호된 경로 접근 시도
    if (!isAuth && !["/login", "/create-account"].includes(pathname)) {
      console.log("Redirecting unauthenticated user to login");
      const callbackUrl = encodeURIComponent(req.url);
      return NextResponse.redirect(
        new URL(`/login?callbackUrl=${callbackUrl}`, req.url)
      );
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        const publicPaths = ["/login", "/create-account"];

        return publicPaths.includes(pathname) || !!token;
      },
    },
  }
);

// 미들웨어 매처 패턴 수정
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\..*|favicon.ico|create-account|login$).*)",
    "/",
  ],
};
